const low = require("lowdb")
const FileSync = require("lowdb/adapters/FileSync")
const adapter = new FileSync("db.json")
const db = low(adapter)

const defaultData = {
    tracking: [],
    limite: 0,
    IPs: [],
    rotas: [],
    map: {},
    ranking: [],
    banlist: [],
    alteracoes: [],
    reset: false,
    reload: false,
    manutencao: {
        emManutencao: true,
        motivo: "Inicialização do Servidor",
        tempo: "1 ~ 5 Minutos"
    }
}

db.defaults(defaultData).write()

const backupServidor = async (app) => {

    try {
        db.set("tracking", app.locals.tracking).value()
        db.set("limite", app.locals.limite).value()
        db.set("rotas", app.locals.rotas).value()
        db.set("map", app.locals.map).value()
        db.set("ranking", app.locals.ranking).value()
        db.set("banlist", app.locals.banlist).value()
        db.set("alteracoes", app.locals.alteracoes).value()
        db.set("reset", app.locals.reset).value()
        db.set("reload", app.locals.reload).value()
        db.set("manutencao", app.locals.manutencao).value()
        db.set("IPs", app.locals.IPs).value()
        db.write()
    } catch (error) {
        console.log(error)
    }
}

const loadBackup = async () => {
    try {
        const data = {
            map: db.get("map").value(),
            tracking: db.get("tracking").value(),
            limite: db.get("limite").value(),
            rotas: db.get("rotas").value(),
            ranking: db.get("ranking").value(),
            banlist: db.get("banlist").value(),
            alteracoes: db.get("alteracoes").value(),
            reset: db.get("reset").value(),
            reload: db.get("reload").value(),
            manutencao: db.get("manutencao").value(),
            IPs: db.get("IPs").value(),
        }
        return {
            data: data,
            status: 200,
            error: ""
        }
    } catch (error) {
        return {
            data: {},
            status: 400,
            error: error
        }
    }
}

module.exports = { backupServidor, loadBackup }