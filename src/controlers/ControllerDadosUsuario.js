const QueryDadosUsuario = require("../querys/QueryDadosUsuario")
const QueryCadastro = require("../querys/QueryCadastro")
const QueryChamado = require("../querys/QueryChamados")

const geradorTokenConfirmacao = require("../utils/stringAleatoria")
const enviarEmail = require("../utils/send-mail")

const DadosDashboard = async (req, res) => {
    const id = req.body.idUsuario
    let ranking = req.app.locals.ranking
    ranking.sort((a, b) => b.valor - a.valor)

    let responseUsuario = await QueryDadosUsuario.DadosUsuario(id)
    let responseContas = await QueryDadosUsuario.DadosContas(id)
    let responseSaques = await QueryDadosUsuario.DadosSaques(id)
    let responseRanking = ranking.slice(0, ranking.length > 5 ? 5 : ranking.length)
    let responseAvatares = await QueryDadosUsuario.BuscarAvatares(id)
    let responseChamados = await QueryChamado.buscarChamadosUsuario(id)
    let responseHistorico = await QueryDadosUsuario.buscarHistorico(id)

    let object = {
        img1: "",
        img2: "",
        img3: "",
        img4: "",
        img5: "",
    }
    let novoAvatares = []
    let count = 1
    if (responseAvatares.length > 0) {
        responseAvatares.forEach((avatar) => {
            object[`img${count}`] = avatar.avatar
            if (count == 5) {
                novoAvatares.push(object)
                object = {
                    img1: "",
                    img2: "",
                    img3: "",
                    img4: "",
                    img5: "",
                }
                count = 1
            } else {
                count++
            }
        })

        novoAvatares.push(object)
    }

    const data = {
        status: 200,
        usuario: responseUsuario,
        contas: responseContas,
        saques: responseSaques,
        ranking: responseRanking,
        avatares: novoAvatares,
        chamados: responseChamados,
        mensagens: [],
        historico: responseHistorico
    }
    return res.json(data)
}

const AtualizarPerfil = async (req, res) => {

    const { idUsuario, avatar, nomeCompleto, pix, banco, recebedor } = req.body
    const response = await QueryDadosUsuario.AtualizarPerfil(idUsuario, avatar, nomeCompleto, pix, banco, recebedor)

    if (response) {
        return res.json({
            status: 200,
            message: `Perfil Atualizado com sucesso!`,
            view: "green"
        })
    } else {
        return res.json({
            status: 601,
            message: `Falha ao atualizar o perfil!`,
            view: "red"
        })
    }
}

const gerarTokenTrocaSenha = async (req, res) => {
    const { email } = req.body
    const token = geradorTokenConfirmacao(15)
    const response = await QueryCadastro.VerificarEmail(email)

    if (response.length > 0) {
        const sendEmail = await enviarEmail(email, "Recuperação de Senha", "token-troca-senha", {
            usuario: response[0].nome,
            token: token
        })
        req.app.locals.alteracoes.push({
            id: response[0].idUsuario,
            token: token
        })
        return res.json({
            status: 200,
            message: `Token de confirmação enviado, verifique o seu e-mail!`,
            view: "green"
        })
    } else {
        return res.json({
            status: 401,
            message: `Falha ao solicitar o token de confirmação!`,
            view: "red"
        })
    }
}

const alterarSenhaUsuario = async (req, res) => {
    try {
        const { senha, token } = req.body
        const alteracoes = req.app.locals.alteracoes
        let object = {}

        alteracoes.forEach((alt, index) => {
            if (alt.token === token) {  
                object = alt
                object.index = index
                return
            }
        })

        if (object) {
            const response = await QueryDadosUsuario.AtualizarSenha(object.id, senha)
            if (response) {
                req.app.locals.alteracoes = alteracoes.slice(object.index, 1)
                res.json({
                    status: 200,
                    message: "Senha alterada com sucesso!"
                })
            } else {
                return res.json({
                    status: 402,
                    message: "Falha na tentativa de alterar a senha!"
                })
            }
        } else {
            return res.json({
                status: 401,
                message: "Falha na tentativa de alterar a senha!"
            })
        }
    } catch (error) {
        console.log(error)
        return res.json({
            status: 400,
            message: "Falha na tentativa de alterar a senha!"
        })
    }
}

module.exports = { DadosDashboard, AtualizarPerfil, gerarTokenTrocaSenha, alterarSenhaUsuario } 