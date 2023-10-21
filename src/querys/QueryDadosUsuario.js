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
        try {
            const data = await Saques.findAll(
                {
                    where: { idUsuario: idUsuario },
                    attributes: {
                        exclude: ['idUsuario', 'createdAt', 'updatedAt']
                    }
                })
            return data
        } catch (error) {
            throw "Falha na conexão com o banco de dados!"
        }
    },
    AtualizarSaldo: async (idUsuario, valor, operation = "menos") => {
        console.log(idUsuario, valor, operation)
        try {
            const data = await Usuarios.increment({
                saldo: operation == "menos" ? parseFloat(-valor) : parseFloat(valor)
            }, {
                where: {
                    idUsuario: idUsuario,
                },
            });
            return data
        } catch (error) {
            throw "Falha na conexão com o banco de dados!"
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
    }
}



module.exports = QueryDadosUsuario
