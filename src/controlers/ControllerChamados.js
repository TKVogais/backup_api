//Importação da função de validação de Tokens

const QueryChamado = require("../querys/QueryChamados")


// Função Middleware que intercepta todas requisições que chegam na API.
// Verifica se nos headers possui um token, se possuir, verifica a validade.

const AbrirChamado = async (req, res) => {
    const { motivo, idUsuario } = req.body

    try {
        const response = await QueryChamado.CadastroChamado(idUsuario, motivo)
        if (response) {
            return res.json({
                status: 200,
                message: "Seu chamado foi aberto com sucesso!",
                data: response
            })
        } else {
            return res.json({
                status: 601,
                message: "Falha ao abrir o seu chamado!"
            })
        }

    } catch (error) {
        return res.json({
            status: 600,
            message: "Não foi possível abrir o seu chamado!"
        })
    }
}
const EnviarMesagem = async (req, res) => {
    const { idChamado, mensagem, type } = req.body
    try {
        const response = await QueryChamado.inserirMensagensChamado(idChamado, mensagem, type)
        if (response) {
            return res.json({
                status: 200,
                desc: "Mensagem enviada com sucesso!",
                message: response
            })
        } else {
            return res.json({
                status: 601,
                message: "Falha ao enviar sua mensagem!"
            })
        }

    } catch (error) {
        console.log(error)
        return res.json({
            status: 600,
            message: "Falha ao enviar sua mensagem!"
        })
    }
}
const BuscarMensagens = async (req, res) => {
    const { idChamado, } = req.body
    try {
        const response = await QueryChamado.buscarMensagensChamado(idChamado)
        if (response) {
            return res.json({
                status: 200,
                message: "Mensagens encontradas!",
                messages: response
            })
        } else {
            return res.json({
                status: 601,
                message: "Falha ao encontrar as mensagens do chamado!"
            })
        }

    } catch (error) {
        console.log(error)
        return res.json({
            status: 600,
            message: "Falha ao encontrar as mensagens do chamado!"
        })
    }
}






//Exportação

module.exports = { AbrirChamado, EnviarMesagem, BuscarMensagens }