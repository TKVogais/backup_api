//Importação da conexão com o banco de dados.

const database = require("../db")

//Importação da model Usuários
const Usuarios = require("../models/Usuarios")
const Contas = require("../models/Contas")
const Saques = require("../models/Saques")

const QueryDadosUsuario = {

    //Consulta que busca o usuário enviado para cadastro.
    DadosUsuario: async (id) => {
        try {
            const data = await Usuarios.findOne(
                {
                    where: { idUsuario: id },
                    attributes: {
                        exclude: ['senha', 'createdAt', 'updatedAt']
                    }
                })
            return data
        } catch (error) {
            console.log(error)
            throw "Falha na conexão com o banco de dados!"
        }
    },
    DadosContas: async (idConta) => {
        try {
            const data = await Contas.findAll(
                {
                    where: { idConta: idConta },
                    attributes: {
                        exclude: ['idUsuario', 'createdAt', 'updatedAt']
                    }
                })
            return data
        } catch (error) {
            console.log(error)
            throw "Falha na conexão com o banco de dados!"
        }
    },
    DadosSaques: async (idUsuario) => {
        const QuerySaque = `
            SELECT
	            S.idsaque as idSaque,
                S.DATA AS data,
                S.STATUS AS status,
                S.VALOR AS valor,
                U.PIX AS pix,
                u.Banco as banco,
                u.recebedor as recebedor,
                u.nome as nome
            FROM SAQUES AS S INNER JOIN USUARIOS AS U ON U.IDUSUARIO = S.IDUSUARIO
            WHERE u.idusuario = ${idUsuario}`
        try {
            const [result] = await database.query(QuerySaque)
            return result
        } catch (error) {
            throw "Falha na conexão com o banco de dados!"
        }
    },
    AtualizarSaldo: async (idUsuario, valor, operation = "menos", desafio = false) => {
        try {
            const data = await Usuarios.increment({
                saldo: operation == "menos" ? parseFloat(-valor) : parseFloat(valor),
                totalDesafios: desafio ? 1 : 0
            }, {
                where: {
                    idUsuario: idUsuario,
                },
            });
            return data
        } catch (error) {
            throw "Falha na conexão com o banco de dados - Atualizar Saldo!"
        }
    },
    AtualizarStatusConta: async (idUsuario) => {
        try {
            const data = await Usuarios.update({ statusConta: "BANIDA" }, {
                where: {
                    idUsuario: idUsuario,
                },
            });
            return data
        } catch (error) {
            throw "Falha na conexão com o banco de dados!"
        }
    },
    AtualizarPerfil: async (idUsuario, avatar, nomeCompleto, pix, banco, recebedor) => {
        try {
            const data = await Usuarios.update({
                avatar: avatar,
                nomeCompleto: nomeCompleto,
                pix: pix,
                banco: banco,
                recebedor: recebedor
            }, {
                where: {
                    idUsuario: idUsuario,
                },
            });
            return data
        } catch (error) {
            throw "Falha na conexão com o banco de dados!"
        }
    }
}



module.exports = QueryDadosUsuario
