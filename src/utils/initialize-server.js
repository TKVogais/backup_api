const { loadBackup } = require("./backup")

const initializeServer = async (app) => {
    const rotas = [
        "facil1",
        "medio1",
        "dificil1",
        "facil2",
        "medio2",
        "dificil2",
        "facil3",
        "medio3",
        "dificil3"
    ]
    const { data = {}, status, error } = await loadBackup()

    switch (status) {
        case 200:
            app.locals.tracking = data.tracking
            app.locals.ranking = data.ranking
            app.locals.banlist = data.banlist
            app.locals.limite = data.limite
            app.locals.rotas = data.rotas
            app.locals.alteracoes = data.alteracoes
            app.locals.reset = data.reset
            app.locals.reload = true
            app.locals.map = data.map
            app.locals.IPs = data.IPs
            break;
        case 400:

            break;
    }
    app.locals.manutencao.emManutencao = false
    app.locals.manutencao.motivo = ""
    app.locals.manutencao.tempo = ""
}

module.exports =initializeServer