(async () => {
    const Contas = require('./src/models/Contas')
    const Usuarios = require('./src/models/Usuarios')
    const Saque = require('./src/models/Saques')
    const Rotas = require('./src/models/Rotas')
    const db = require('./src/db')

    await db.sync({ force: true })
})()