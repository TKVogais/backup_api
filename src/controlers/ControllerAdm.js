const {
    ListarUsuarios,
    AlterarStatusConta,
    ListaSaques,
    AlterarStatusSaque,
    BuscarRotas,
    CadastrarRota,
    BuscarTodasRotas,
    InserirAvatar,
    buscarChamados,
    atualizarStatusChamado
} = require("../querys/QueryAdmin")

const { validarToken } = require("../utils/jwt")
const { AtualizarSaldo, DadosUsuario, BuscarAvatares } = require("../querys/QueryDadosUsuario")
const { loadInfo } = require("../utils/monitoramento")
const { mapeamentoRotas } = require("../utils/config-route-sua-url");
const { loadBackup } = require("../utils/backup");

const listarDadosAdmin = async (req, res) => {
    let ranking = req.app.locals.ranking
    const { id } = req.body
    ranking.sort((a, b) => b.valor - a.valor)
    const responseRotas = await BuscarTodasRotas()
    const responseUsuarios = await ListarUsuarios()
    const responseRanking = ranking
    const responseTracking = req.app.locals.tracking
    const responseMap = req.app.locals.map
    const [responseSaques] = await ListaSaques()
    const responseUsuario = await DadosUsuario(id)
    const [responseChamados] = await buscarChamados()
    let responseAvatares = await BuscarAvatares(id)

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

    res.json({
        usuarios: responseUsuarios,
        tracking: responseTracking,
        map: responseMap,
        ranking: responseRanking,
        saques: responseSaques,
        usuario: responseUsuario,
        rotas: responseRotas,
        manutencao: req.app.locals.manutencao,
        avatares: novoAvatares,
        chamados: responseChamados
    })
}

const alterarStatusConta = async (req, res) => {
    const { idUsuario, status } = req.body
    let banlist = req.app.locals.banlist
    const response = await AlterarStatusConta(idUsuario, status)
    if (response) {
        if (status == "BANIDA") {
            req.app.locals.banlist.push(idUsuario)
        } else {
            req.app.locals.banlist = banlist.filter(id => id == idUsuario)
        }
        res.json({
            status: 200,
            message: "Status da conta alterado com sucesso!"
        })
    } else {
        res.json({
            status: 601,
            message: "Falha ao alterar o status da conta!"
        })
    }
}
const alterarChamado = async (req, res) => {
    try {
        const response = await atualizarStatusChamado(req.body.idChamado, req.body.status)
        if (response) {
            res.json({
                status: 200,
                message: "Status do chamado alterado com sucesso!"
            })
        } else {
            res.json({
                status: 601,
                message: "Falha ao alterar o status do chamado!"
            })
        }
    } catch (error) {
        console.log(error)
        res.json({
            status: 601,
            message: "Falha ao alterar o status do chamado!"
        })
    }
}
const alterarStatusSaque = async (req, res) => {

    try {
        const { idSaque, status, valor, idUsuario } = req.body
        let responseSaque, responseSaldo

        responseSaque = await AlterarStatusSaque(idSaque, status)

        if (status == "CANCELADO") {
            responseSaldo = await AtualizarSaldo(idUsuario, valor, "mais", false)
            if (responseSaque && responseSaldo) {
                return res.json({
                    status: 200,
                    message: "Status do saque alterado com sucesso!"
                })
            } else {
                return res.json({
                    status: 601,
                    message: "Falha ao alterar o status do saque!"
                })
            }
        } else {
            if (responseSaque) {
                return res.json({
                    status: 200,
                    message: "Status do saque alterado com sucesso!"
                })
            } else {
                return res.json({
                    status: 601,
                    message: "Falha ao alterar o status do saque!"
                })
            }
        }
    } catch (error) {
        console.log(error)
    }
}

const ValidarTokenUser = async (req, res) => {
    try {
        const tokenHeader = req.headers["authorization"]
        const token = tokenHeader.split(" ")[1]
        if (await validarToken(token)) {
            res.json({
                status: 200,
                message: "Token válido",
                mode: ""
            })

        } else {
            res.json({
                status: 601,
                message: "Token inválido",
                mode: ""
            })
        }
    } catch (error) {
        res.json({
            status: 601,
            message: "Token inválido",
            mode: ""
        })
    }
}


const cadastarRotas = async (req, res) => {
    try {
        let response = await BuscarRotas(req.body.nRota)

        if (response) {
            return res.json({
                status: 401,
                message: `Rota já cadastrada`,
                view: "red"
            })
        }
        response = await CadastrarRota(req.body)
        if (response) {
            return res.json({
                status: 200,
                message: `Rota cadastrada com sucesso!`,
                view: "green"
            })
        } else {
            return res.json({
                status: 400,
                message: `Falha ao realizar o cadastro da rota`,
                view: "red"
            })
        }
    } catch (error) {
        return res.json({
            status: 400,
            message: `Falha ao realizar o cadastro da rota`,
            view: "red"
        })
    }

}

const manutencaoPlataforma = async (req, res) => {
    try {
        req.app.locals.manutencao = req.body
        return res.json({
            status: 200,
            message: "Status da plataforma alterado com sucesso!"
        })
    } catch (error) {
        return res.json({
            status: 400,
            message: "Falha na manutenção"
        })
    }
}

const monitoramentoServidor = async (req, res) => {
    const response = await loadInfo()
    response.status = 200
    res.json(response)
}

const mapeamento = (req, res) => {
    return res.json({
        mapeamento: req.app.locals.tracking,
        status: 200
    })
}

const ranking = (req, res) => {
    let ranking = req.app.locals.ranking
    const { id } = req.body
    ranking.sort((a, b) => b.valor - a.valor)
    return res.json({
        status: 200,
        ranking: ranking
    })
}

const cadastarAvatares = async (req, res) => {
    const { idUsuario, avatar } = req.body
    try {
        let response = await InserirAvatar(idUsuario, avatar)
        console.log(response)
        if (response) {
            return res.json({
                status: 200,
                message: "Perfil cadastrado com sucesso!"
            })
        } else {
            return res.json({
                status: 400,
                message: `Falha ao realizar o cadastro do avatar`,
                view: "red"
            })
        }

    } catch (error) {
        console.log(error)
        return res.json({
            status: 400,
            message: `Falha ao realizar o cadastro do avatar`,
            view: "red"
        })
    }
}

const sincronizarServidor = async (req, res) => {
    const response = await BuscarTodasRotas("server")
    const limite = req.app.locals.limite - 1
    let object = "{"
    try {
        response.forEach((rota, index) => {
            if (index > limite) {
                object += `"R${index + 1}facil1": [],`
                object += `"R${index + 1}medio1": [],`
                object += `"R${index + 1}dificil1": [],`
                object += `"R${index + 1}facil2": [],`
                object += `"R${index + 1}medio2": [],`
                object += `"R${index + 1}dificil2": [],`
                object += `"R${index + 1}facil3": [],`
                object += `"R${index + 1}medio3": [],`
                object += `"R${index + 1}dificil3": []${index + 1 == response.length ? "" : ","}`
            }
        })
        object += "}"
        req.app.locals.map = { ...req.app.locals.map, ...JSON.parse(object) }
        req.app.locals.limite = response.length
        req.app.locals.rotas = JSON.parse(JSON.stringify(response))
        return res.json({
            status: 200,
            message: "Servidor sincronizado"
        })
    } catch (error) {
        s
        console.log(error)
        return res.json({
            status: 700,
            message: "sem alterações",
            error: error
        })
    }
}

const restaurarServidor = async (req, res) => {

    const manutencaoAnterior = req.app.locals.manutencao.emManutencao
    if (!manutencaoAnterior) {
        req.app.locals.manutencao.emManutencao = true
        req.app.locals.manutencao.motivo = "Manutenção - Restauração de Backup"
        req.app.locals.manutencao.tempo = "30 Segundos"
    }

    let response = {}

    const { data = {}, status, error } = await loadBackup()

    switch (status) {
        case 200:
            req.app.locals.tracking = data.tracking
            req.app.locals.ranking = data.ranking
            req.app.locals.banlist = data.banlist
            req.app.locals.limite = data.limite
            req.app.locals.rotas = data.rotas
            req.app.locals.alteracoes = data.alteracoes
            req.app.locals.reset = data.reset
            req.app.locals.map = data.map
            req.app.locals.IPS = data.IPs
            response.status = 200
            response.message = "Backup restaurado com sucesso!"
            response.error = ""
            break;
        case 400:
            response.status = 400
            response.message = "Falha ao restaurar o backup!"
            response.error = error
            break;
    }
    if (!manutencaoAnterior) {
        req.app.locals.manutencao.emManutencao = false
        req.app.locals.manutencao.motivo = ""
        req.app.locals.manutencao.tempo = ""
    }
    return res.json(response)
}

module.exports = {
    listarDadosAdmin,
    alterarStatusConta,
    ValidarTokenUser,
    alterarStatusSaque,
    cadastarRotas,
    manutencaoPlataforma,
    monitoramentoServidor,
    mapeamento,
    ranking,
    cadastarAvatares,
    sincronizarServidor,
    restaurarServidor,
    alterarChamado
}