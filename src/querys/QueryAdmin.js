//Importação da conexão com o banco de dados.

const database = require("../db")

//Importação da model Usuários
const Usuarios = require("../models/Usuarios")
const Saques = require("../models/Saques")
//Objeto de consultas

const Query = `SELECT
S.idSaque as idSaque,
S.idUsuario AS idUsuario,
S.data AS data,
S.status AS status,
S.valor AS valor,
U.pix AS pix,
U.banco as banco,
U.recebedor as recebedor,
U.nome as nome
FROM saques AS S INNER JOIN usuarios AS U ON U.idUsuario = S.idUsuario`

const QueryAdmin = {

    //Consulta que busca o usuário enviado para login.
    ListarUsuarios: async () => {
        try {
            return await Usuarios.findAll({
                attributes: {
                    exclude: [
                        'senha',
                    ]
                }
            })
        } catch (error) {
            throw "Falha na conexão com o banco de dados!"
        }
    },
    AlterarStatusConta: async (idUsuario, status) => {
        try {
            return await Usuarios.update({
                statusConta: status
            }, {
                where: {
                    idUsuario: idUsuario
                }
            })
        } catch (error) {
            throw "Falha na conexão com o banco de dados!"
        }
    },
    ListaSaques: async () => {
        try {
            return await database.query(Query)
        } catch (error) {
            throw "Falha na conexão com o banco de dados!"
        }
    },
    AlterarStatusSaque: async (idSaque, status) => {
        try {
            return await Saques.update({
                status: status
            }, {
                where: {
                    idSaque: idSaque
                }
            })
        } catch (error) {
            throw "Falha na conexão com o banco de dados!"
        }
    }
}



module.exports = QueryAdmin


