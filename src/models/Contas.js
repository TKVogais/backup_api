//Importação do Sequelize
const Sequelize = require("sequelize")

//Importação da Conexão com o Banco de Dados
const database = require("../db")

//Importação da Model Usuários
const Usuarios = require("./Usuarios")

//Definição do Model Conta
const Conta = database.define('contas', {
    idConta: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    idUsuario: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    usuarioConta: {
        type: Sequelize.STRING(30),
        allowNull: false,
    },
    status: Sequelize.STRING(15),
    qtdeAcoes: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    },
    lucro: {
        type: Sequelize.DOUBLE,
        defaultValue: 0
    },
    plataforma: Sequelize.STRING(30)
})

//Criação do relacionamento entre conta e plataforma (idPlataforma)


//Criação do relacionamento entre conta e usuarios (idUsuario)

Conta.belongsTo(Usuarios, {
    constraint: true,
    foreignKey: "idUsuario"
})

module.exports = Conta