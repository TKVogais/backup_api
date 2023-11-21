const QueryDadosUsuario = require("../querys/QueryDadosUsuario")

const DadosDashboard = async (req, res) => {
    const id = req.body.idUsuario
    let ranking = req.app.locals.ranking
    ranking.sort((a, b) => b.valor - a.valor)

    let responseUsuario = await QueryDadosUsuario.DadosUsuario(id)
    let responseContas = await QueryDadosUsuario.DadosContas(id)
    let responseSaques = await QueryDadosUsuario.DadosSaques(id)
    let responseRanking = ranking.slice(0, ranking.length > 5 ? 5 : ranking.length)
    let responseAvatares = await QueryDadosUsuario.BuscarAvatares(id)

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
        usuario: responseUsuario,
        contas: responseContas,
        saques: responseSaques,
        ranking: responseRanking,
        avatares: novoAvatares
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


module.exports = { DadosDashboard, AtualizarPerfil } 