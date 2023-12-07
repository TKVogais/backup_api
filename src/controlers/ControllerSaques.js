const QuerySaque = require("../querys/QuerySaques")
const QueryDadosUsuario = require("../querys/QueryDadosUsuario")
const enviarEmail = require("../utils/send-mail")

const SolicitacaoSaque = async (req, res) => {
    const { idUsuario, valor, saldoClient, pix, recebedor, banco } = req.body
    const data = new Date()
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
            try {
                const dataUser = await QueryDadosUsuario.buscarEmail(idUsuario)
                const sendEmail = await enviarEmail(dataUser.email, "Saque Solicitado!", "saque-solicitado", {
                    usuario: dataUser.nome,
                    valor: valor,
                    data: data.toLocaleDateString()
                })
            } catch (error) {

            }
            return res.json({
                status: 200,
                message: `Seu saque foi solicitado com sucesso!`,
                view: "green",
                idSaque: response.idSaque
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