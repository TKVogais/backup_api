//Importação das consultas no banco de dados.

const QueryCadastro = require("../querys/QueryCadastro")

//Função de cadastro do usuário.

const CadastroUsuario = async (req, res) => {
    const { usuario, senha, email } = req.body
    let response

    try {
        //Consulta no banco de dados se o usuário já está em uso.
        response = await QueryCadastro.VerificarUsuario(usuario)

        if (response.length > 0) {
            return res.json({
                status: 401,
                message: `O usuário '${usuario}' já está em uso!`,
                view: "orange"
            })
        }

        //Consulta no banco de dados se o e-mail já está em uso.
        response = await QueryCadastro.VerificarEmail(email)

        if (response.length > 0) {
            return res.json({
                status: 401,
                message: `O e-mail '${email}' já está em uso!`,
                view: "orange"
            })
        }

        //Inserção do usuário no banco de dados.
        response = await QueryCadastro.CadastroUsuario(usuario, email, senha)

        if (response) {
            return res.json({
                status: 200,
                message: `Usuário cadastrado com sucesso!`,
                view: "green"
            })
        } else {
            return res.json({
                status: 400,
                message: `Falha ao realizar o cadastro do usuário ${usuario}`,
                view: "red"
            })
        }
    } catch (error) {
        return res.json({
            status: 200,
            message: `Falha ao realizar o cadastro do usuário ${usuario}`,
            view: "red"
        })
    }

}


module.exports = { CadastroUsuario }