const QuerySaque = require("../querys/QuerySaques")
const QueryDadosUsuario = require("../querys/QueryDadosUsuario")
const SolicitacaoSaque = async (req, res) => {
    const { idUsuario, valor, pix, saldoClient } = req.body
    let response

    try {
        response = await QueryDadosUsuario.DadosUsuario(idUsuario)
        console.log(response)
        if (response.saldo != saldoClient) {
            await QueryDadosUsuario.AtualizarStatusConta(idUsuario)
            return res.json({
                status: 1000,
                message: `BAN!!!`,
                view: "red"
            })
        }


        response = await QueryDadosUsuario.AtualizarSaldo(idUsuario, valor)
        console.log("==============ATUALIZAÇÃO DE SALDO APÓS O SAQUE==================")
        console.log(response)
        if (!response) {
            return res.json({
                status: 401,
                message: `Falha ao registrar o seu saque!`,
                view: "red"
            })

        }

        response = await QuerySaque.CadastroSque(idUsuario, valor, pix)

        if (response) {
            return res.json({
                status: 200,
                message: `Seu saque foi solicitado com sucesso!`,
                view: "green"
            })  
        } else {
            return res.json({
                status: 401,
                message: `Falha ao registrar o seu saque!`,
                view: "red"
            })
        }
    } catch (error) {
        return res.json({
            status: 200,
            message: `Falha ao registrar o seu saque!`,
            view: "red"
        })
    }
}

module.exports = { SolicitacaoSaque }