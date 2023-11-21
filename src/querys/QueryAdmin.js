//Importação da conexão com o banco de dados.

const database = require("../db")

//Importação da model Usuários
const Usuarios = require("../models/Usuarios")
const Saques = require("../models/Saques")
const Rota = require("../models/Rotas")
const Avatar = require("../models/Avatares")
//Objeto de consultas

const Query = `SELECT
S.idSaque as idSaque,
S.idUsuario AS idUsuario,
S.data AS data,
S.status AS status,
S.valor AS valor,
S.pix AS pix,
S.banco as banco,
S.recebedor as recebedor,
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
    },
    BuscarRotas: async (nRota) => {
        try {
            return await Rota.findOne({
                where: { nRota: nRota }
            })
        } catch (error) {
            throw "Falha na conexão com o banco de dados!"
        }
    },
    CadastrarRota: async (data) => {
        const { nRota, facil1, medio1, dificil1, facil2, medio2, dificil2, facil3, medio3, dificil3 } = data
        try {
            return await Rota.create({
                nRota: nRota,
                facil1: facil1,
                medio1: medio1,
                dificil1: dificil1,
                facil2: facil2,
                medio2: medio2,
                dificil2: dificil2,
                facil3: facil3,
                medio3: medio3,
                dificil3: dificil3
            })
        } catch (error) {
            console.log(error)
            throw "Falha na conexão com o banco de dados!"
        }
    },
    BuscarTodasRotas: async (type = "admin") => {
        try {
            if(type == "admin"){
                return await Rota.findAll()
            }else{
                return await Rota.findAll({
                    attributes: {
                        exclude: [
                            'idRota',
                            'nRota',
                            'createdAt',
                            'updatedAt'
                        ]
                    }
                })
            }
        } catch (error) {
            throw "Falha na conexão com o banco de dados!"
        }
    },
    InserirAvatar: async (idUsuario, avatar) => {
        try {
            return await Avatar.create({
                avatar: avatar,
                idUsuario: idUsuario
            })
        } catch (error) {
            console.log(error)
            throw "Falha na conexão com o banco de dados!"
        }
    }
}



module.exports = QueryAdmin


