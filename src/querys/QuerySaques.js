//Importação da conexão com o banco de dados.

const database = require("../db")

const Saques = require("../models/Saques")


const QuerySaque = {

    CadastroSque: async (idUsuario, valor) => {
        const data = new Date()
        const hoje = data.toLocaleDateString("pt-BR")
        try {
            return await Saques.create({
                idUsuario: idUsuario,
                valor: valor,
                data: hoje,
            })
        } catch (error) {
            console.log(error)
            throw "Falha na conexão com o banco de dados - Cadastro Saque!"
        }
    }
}



module.exports = QuerySaque


