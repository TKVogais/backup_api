//Importação da conexão com o banco de dados.

const database = require("../db")

//Importação da model Usuários
const Usuarios = require("../models/Usuarios")

//Importação da função que gera hash da senha.

const { hash } = require("../utils/criptografia")

//Objeto de consultas
const QueryCadastro = {

    //Consulta que busca o usuário enviado para cadastro.
    VerificarUsuario: async (usuario) => {
        try {
            return await Usuarios.findAll({ where: { nome: usuario } })
        } catch (error) {
            console.log(error)
            throw "Falha na conexão com o banco de dados!"
        }
    },
    //Consulta que busca o e-mail enviado para cadastro.
    VerificarEmail: async (email) => {
        try {
            return await Usuarios.findAll({ where: { email: email } })
        } catch (error) {
            console.log(error)
            throw "Falha na conexão com o banco de dados!"
        }
    },

    CadastroUsuario: async (usuario, email, senha) => {
        try {
            return await Usuarios.create({
                nome: usuario,
                senha: senha,
                email: email,
                avatar: "/pessoa1.png"
            })
        } catch (error) {
            console.log(error)
            throw "Falha na conexão com o banco de dados!"
        }
    }
}



module.exports = QueryCadastro
