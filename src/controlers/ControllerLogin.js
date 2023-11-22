const { compare } = require("../utils/criptografia")
const { gerarToken } = require("../utils/jwt")
const QueryLogin = require("../querys/QueryLogin")

const Login = async (req, res) => {
    const { usuario, senha } = req.body
    let response
    try {
        //Consulta no banco de dados se o usuário está correto.
        response = await QueryLogin.BuscarUsuario(usuario)

        //Verificar se foi retornado um objeto:
        //Se for um objeto (true), segue a execução, caso (false), retorna erro
        if (!response) {
            return res.json({
                status: 401,
                message: `Falha ao realizar o login!`,
                view: "red",
            })
        }
        if (response.statusConta === "BANIDA") {
            return res.json({
                status: 402,
                message: `Sua conta foi banida por violar nossos termos de uso!`,
                view: "red",
            })
        }

        //Recupera o hash da senha do usuário
        const hash = response.senha
        const id = response.idUsuario
        const tipoUsuario = response.tipoUsuario
        //Compara a senha envia com o hash da senha original
        // response = await compare(senha, hash)

        response = senha == hash ? true : false

        if (response) {
            return res.json({
                status: 200,
                view: "green    ",
                message: `Login realizado com sucesso`,
                token: await gerarToken(id, tipoUsuario),
                idUsuario: id,
                tipoUsuario: tipoUsuario
            })
        } else {
            return res.json({
                status: 403,
                view: "red",
                message: `Falha ao realizar o login!`
            })
        }


    } catch (error) {
        {
            return res.json({
                status: 400,
                view: "red",
                message: `Falha ao realizar o login!`
            })
        }
    }
}

module.exports = { Login }
