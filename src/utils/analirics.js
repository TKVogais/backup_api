const QueryDadosUsuario = require("../querys/QueryDadosUsuario")
const { backupServidor } = require("./backup")

const AnalysisServer = async (app) => {

    if (!app.locals.manutencao.emManutencao) {
        await backupServidor(app)
    }

    const date = new Date()
    const horas = date.toLocaleTimeString().slice(0, 5)
    console.log(horas)

    if (horas === "19:54" && !app.locals.reset) {
        const keys = Object.keys(app.locals.map)

        let RankingPremiado = app.locals.ranking.slice(0,
            app.locals.ranking.length > 5
                ? 5
                : app.locals.ranking.length
        )

        console.log(RankingPremiado)
        try {
            RankingPremiado.forEach(async (usuario, index) => {

                console.log("================================")
                console.log(usuario)
                console.log("================================")
                let valor = 0
                console.log(`Index: ${index}`)
                switch (index) {
                    case 0:
                        valor = usuario.valor * 10 / 100
                        console.log("Calculando com 10%")
                        break;
                    case 1:
                        valor = usuario.valor * 8 / 100
                        console.log("Calculando com 8%")
                        break;
                    case 2:
                        valor = usuario.valor * 6 / 100
                        console.log("Calculando com 6%")
                        break;
                    case 3:
                        valor = usuario.valor * 4 / 100
                        console.log("Calculando com 4%")
                        break;
                    case 4:
                        valor = usuario.valor * 2 / 100
                        console.log("Calculando com 2%")
                        break;
                }

                console.log(`Valor Acumulado pelo usuário: ${usuario.valor}`)
                console.log(`Valor Ranking Premiado: ${valor}`)
                const saldo = await QueryDadosUsuario.AtualizarSaldo(usuario.idUsuario, valor, "mais", false)
                const historico = await QueryDadosUsuario.inserirHistorico(usuario.idUsuario, "ranking", valor)
                
            })
        } catch (error) {
            console.log(error)
        }
        app.locals.reset = true
        app.locals.manutencao.emManutencao = true
        app.locals.manutencao.motivo = "Reboot do servidor"
        app.locals.manutencao.tempo = "1 Min"
        app.locals.tracking = []
        app.locals.IPs = []
        keys.forEach((key) => {
            app.locals.map[key] = []
        })
        app.locals.ranking = []
        await backupServidor(app)
    }
    if (horas == "19:55" && app.locals.reset) {
        app.locals.reset = false
        app.locals.manutencao.emManutencao = false
        app.locals.manutencao.motivo = ""
        app.locals.manutencao.tempo = ""
        await backupServidor(app)
    }
}

module.exports = { AnalysisServer }