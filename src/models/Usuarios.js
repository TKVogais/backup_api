//Importação do Sequelize
const Sequelize = require("sequelize")

//Importação da Conexão com o Banco de Dados
const database = require("../db")
const { sq } = require("date-fns/locale")

//Definição do Model Usuários

const Usuario = database.define('usuarios', {
    idUsuario: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    senha: Sequelize.STRING(70),
    email: Sequelize.STRING(70),
    nome: Sequelize.STRING(70),
    avatar: Sequelize.STRING(10),
    totalSaques: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    },
    saldo: {
        type: Sequelize.DOUBLE,
        defaultValue: 0
    },
    saldoPendente: {
        type: Sequelize.DOUBLE,
        defaultValue: 0
    },
    lucroTotal: {
        type: Sequelize.DOUBLE,
        defaultValue: 0
    },
    statusConta:  {
        type: Sequelize.STRING,
        defaultValue: "ATIVA"
    }
})

module.exports = Usuario