const { backupServidor } = require("./backup")

const AnalysisServer = async (app) => {

    if(!app.locals.manutencao.emManutencao){
        await backupServidor(app)
    }
    
    const date = new Date()
    const horas = date.toLocaleTimeString().slice(0, 2)
    if (horas === "21") {
        app.locals.manutencao.emManutencao = true
        app.locals.manutencao.motivo = "Reboot do servidor"
        app.locals.manutencao.tempo = "2 Min"
        app.locals.tracking = []
        app.locals.map = []
        app.locals.ranking = []
        setTimeout(() => {
            app.locals.manutencao.emManutencao = false
            app.locals.manutencao.motivo = ""
            app.locals.manutencao.tempo = ""
        }, 50000)
    }
}

module.exports = { AnalysisServer }