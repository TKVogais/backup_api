const QuerySaque = require("../querys/QuerySaques")
const QueryDadosUsuario = require("../querys/QueryDadosUsuario")

const SolicitacaoSaque = async (req, res) => {
    const { idUsuario, valor, saldoClient, pix, recebedor, banco } = req.body
    let response

    try {
        response = await QueryDadosUsuario.DadosUsuario(idUsuario)
        if (response.saldo != saldoClient) {
            await QueryDadosUsuario.AtualizarStatusConta(idUsuario)
            return res.json({
                status: 1000,
                message: `BAN!!!`,
                view: "red"
            })
        }

        response = await QueryDadosUsuario.AtualizarSaldo(idUsuario, valor)

        if (!response) {
            return res.json({
                status: 401,
                message: `Falha ao registrar o seu saque!`,
                view: "red"
            })

        }
        await QueryDadosUsuario.AtualizarDadosBancarios(idUsuario, pix, banco, recebedor)
        response = await QuerySaque.CadastroSaque(idUsuario, valor, banco, pix, recebedor)

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
        console.log(error)
        return res.json({
            status: 401,
            message: `Falha ao registrar o seu saque!`,
            view: "red"
        })
    }
}

module.exports = { SolicitacaoSaque }