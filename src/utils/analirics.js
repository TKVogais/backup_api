const QueryDadosUsuario = require("../querys/QueryDadosUsuario")
const { backupServidor } = require("./backup")

const AnalysisServer = async (app) => {

    if (!app.locals.manutencao.emManutencao) {
        await backupServidor(app)
    }

    const date = new Date()
    const horas = date.toLocaleTimeString().slice(0, 5)
    if (horas === "21:00" && !app.locals.reset) {
        const keys = Object.keys(app.locals.map)

        let RankingPremiado = ranking.slice(0,
            app.locals.ranking.length > 5
                ? 5
                : app.locals.ranking.length
        )
        try {
            RankingPremiado.forEach(async (usuario, index) => {
                let valor = 0
                switch (index) {
                    case 0: valor = usuario.valor * 10 / 100
                    case 1: valor = usuario.valor * 8 / 100
                    case 2: valor = usuario.valor * 6 / 100
                    case 3: valor = usuario.valor * 4 / 100
                    case 4: valor = usuario.valor * 2 / 100
                }

                await QueryDadosUsuario.AtualizarSaldo(usuario.idUsuario, valor, "mais", false)
                await QueryDadosUsuario.inserirHistorico(usuario.idUsuario, "ranking", valor)
            })
        } catch (error) {

        }
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