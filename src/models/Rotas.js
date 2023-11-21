//Importação do Sequelize
const Sequelize = require("sequelize")

//Importação da Conexão com o Banco de Dados
const database = require("../db")

//Importação da Model Usuários


//Definição do Model Conta
const Rota = database.define('rotas', {
    idRota: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    nRota: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    facil1: {
        type: Sequelize.STRING(50),
        defaultvalue: ""
    },
    medio1: {
        type: Sequelize.STRING(50),
        defaultvalue: ""
    },
    dificil1: {
        type: Sequelize.STRING(50),
        defaultvalue: ""
    },
    facil2: {
        type: Sequelize.STRING(50),
        defaultvalue: ""
    },
    medio2: {
        type: Sequelize.STRING(50),
        defaultvalue: ""
    },
    dificil2: {
        type: Sequelize.STRING(50),
        defaultvalue: ""
    }
    ,
    facil3: {
        type: Sequelize.STRING(50),
        defaultvalue: ""
    },
    medio3: {
        type: Sequelize.STRING(50),
        defaultvalue: ""
    },
    dificil3: {
        type: Sequelize.STRING(50),
        defaultvalue: ""
    }
})

module.exports = Rota