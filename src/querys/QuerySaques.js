//Importação da conexão com o banco de dados.

const database = require("../db")

const Saques = require("../models/Saques")


const QuerySaque = {

    CadastroSque: async (idUsuario, valor, pix) => {
        const data = new Date()
        const hoje = `${data.getDay() < 10 ?`0${data.getDay()}`: data.getDay()
            }/${data.getMonth() < 10 ? `0${data.getMonth()}` : data.getMonth()}/${data.getFullYear()
            }`
        try {
            return await Saques.create({
                idUsuario: idUsuario,
                valor: valor,
                data: hoje,
                pix: pix
            })
        } catch (error) {
            throw "Falha na conexão com o banco de dados!"
        }
    }
}



module.exports = QuerySaque


