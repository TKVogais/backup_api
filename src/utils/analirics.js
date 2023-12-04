const { backupServidor } = require("./backup")

const AnalysisServer = async (app) => {

    if (!app.locals.manutencao.emManutencao) {
        await backupServidor(app)
    }

    const date = new Date()
    const horas = date.toLocaleTimeString().slice(0, 5)
    if (horas === "21:00" && !app.locals.reset) {
        const keys = Object.keys(app.locals.map)
        app.locals.reset = true
        app.locals.manutencao.emManutencao = true
        app.locals.manutencao.motivo = "Reboot do servidor"
        app.locals.manutencao.tempo = "1 Min"
        app.locals.tracking = []
        keys.forEach((key) => {
            app.locals.map[key] = []
        })
        app.locals.ranking = []
        await backupServidor(app)
    }
    if (horas == "21:01" && app.locals.reset) {
        app.locals.reset = false
        app.locals.manutencao.emManutencao = false
        app.locals.manutencao.motivo = ""
        app.locals.manutencao.tempo = ""
        await backupServidor(app)
    }
}

module.exports = { AnalysisServer }