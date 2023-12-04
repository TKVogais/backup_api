//Importação do Sequelize
const Sequelize = require("sequelize")

//Importação da Conexão com o Banco de Dados
const database = require("../db")

//Importação da Model Usuários
const Usuarios = require("./Usuarios")

//Definição do Model Avatar
const Chamado = database.define('chamados', {
    idChamado: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    idUsuario: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    motivo: {
        type: Sequelize.STRING(30),
        allowNull: false,
    },
    status: {
        type: Sequelize.STRING(50),
        defaultValue: "PENDENTE"
    }
})

Chamado.belongsTo(Usuarios, {
    constraint: true,
    foreignKey: "idUsuario"
})

module.exports = Chamado