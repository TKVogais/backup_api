const { ListarUsuarios, AlterarStatusConta, ListaSaques, AlterarStatusSaque } = require("../querys/QueryAdmin")
const { validarToken } = require("../utils/jwt")
const { AtualizarSaldo } = require("../querys/QueryDadosUsuario")

const listarDadosAdmin = async (req, res) => {
    let ranking = req.app.locals.ranking
    ranking.sort((a, b) => b.valor - a.valor)
    const responseUsuarios = await ListarUsuarios()
    const responseRanking = ranking
    const responseTracking = req.app.locals.tracking
    const responseMap = req.app.locals.map
    const [responseSaques] = await ListaSaques()

    res.json({
        usuarios: responseUsuarios,
        tracking: responseTracking,
        map: responseMap,
        ranking: responseRanking,
        saques: responseSaques
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
const alterarStatusSaque = async (req, res) => {

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

module.exports = {
    listarDadosAdmin,
    alterarStatusConta,
    ValidarTokenUser,
    alterarStatusSaque
}