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
    dificuldade: {
        type: Sequelize.STRING(15),
        allowNull: false,
    },
    link: Sequelize.STRING,
    redirecionamento: Sequelize.STRING,
    valor: {
        type: Sequelize.DOUBLE,
        defaultValue: 0
    }
})

module.exports = Rota