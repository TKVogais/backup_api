(async () => {
    const Contas = require('./src/models/Contas')
    const Usuarios = require('./src/models/Usuarios')
    const Saque = require('./src/models/Saques')
    const Rotas = require('./src/models/Rotas')
    const Avatares = require('./src/models/Avatares')
    const Chamado = require('./src/models/Chamados')
    const Mesagem = require('./src/models/Messagens')
    const Historico = require('./src/models/Historico')
    const db = require('./src/db')

    await db.sync({ force: false })
})()