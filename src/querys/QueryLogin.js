//Importação da conexão com o banco de dados.

const database = require("../db")

//Importação da model Usuários
const Usuarios = require("../models/Usuarios")

//Objeto de consultas
const QueryLogin = {

    //Consulta que busca o usuário enviado para login.
    BuscarUsuario: async (usuario) => {
        try {
            return await Usuarios.findOne({ where: { nome: usuario } })
        } catch (error) {
            console.log(error)
            throw "Falha na conexão com o banco de dados!"
        }
    }
}



module.exports = QueryLogin


