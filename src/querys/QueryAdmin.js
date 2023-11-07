//Importação da conexão com o banco de dados.

const database = require("../db")

//Importação da model Usuários
const Usuarios = require("../models/Usuarios")
const Saques = require("../models/Saques")
//Objeto de consultas

const Query = `SELECT
S.idsaque as idSaque,
S.IDUSUARIO AS idUsuario,
S.DATA AS data,
S.STATUS AS status,
S.VALOR AS valor,
U.PIX AS pix,
u.Banco as banco,
u.recebedor as recebedor,
u.nome as nome
FROM SAQUES AS S INNER JOIN USUARIOS AS U ON U.IDUSUARIO = S.IDUSUARIO`

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


