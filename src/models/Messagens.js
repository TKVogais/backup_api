//Importação do Sequelize
const Sequelize = require("sequelize")

//Importação da Conexão com o Banco de Dados
const database = require("../db")

//Importação da Model Usuários
const Chamado = require("./Chamados")

//Definição do Model Avatar
const Mensagem = database.define('mensagens', {
    idMensagem: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    idChamado: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    mensagem: {
        type: Sequelize.STRING(150),
        allowNull: false,
    },
    type: {
        type: Sequelize.STRING(20),
        allowNull: false,
    },
})

Mensagem.belongsTo(Chamado, {
    constraint: true,
    foreignKey: "idChamado"
})

module.exports = Mensagem