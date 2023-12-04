//Carregando Módulos

const express = require("express");
const { createServer } = require('node:http');
const { join } = require('node:path');
const { Server } = require('socket.io');
const app = express();
const server = createServer(app);
const ws = new Server(server, {
    cors: {
        origin: "*"
    }
});
const cors = require('cors');
const routes = require("./config-routes")
const path = require('path')

//Importação das configurações de rotas


const { AnalysisServer } = require("./src/utils/analirics");
const { loadBackup } = require("./src/utils/backup");
const initializeServer = require("./src/utils/initialize-server");



//Configuração das politícas de acesso (todos os IP's)

app.options('*', cors())
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    app.use(cors)
    next();
})

//Configurações

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.set("view engine", "ejs")
app.use(express.static(path.join(__dirname, '/public')))


//Array's para controle de funcionalidades da API

app.locals.tracking = []
app.locals.limite = 0
app.locals.rotas = []
app.locals.map = {}
app.locals.ranking = []
app.locals.banlist = []
app.locals.alteracoes = []
app.locals.IPs = []
app.locals.reset = false
app.locals.reload = false
app.locals.manutencao = {
    emManutencao: true,
    motivo: "Inicialização do Servidor",
    tempo: "1 ~ 5 Minutos"
}
const loadServer = async () => {
    if (!app.locals.reload) {
        await initializeServer(app)
    }
}
loadServer()

setInterval(async () => {
    await AnalysisServer(app)
}, 5000)
const PORT = process.env.PORT || 4000;


//Carregamento e Configuração das Rotas

routes.forEach((route) => {
    app.use('/api', route)
})

//Iniciando os servidores


server.listen(PORT, () => {
    console.log("Rodando o API na porta " + PORT);
})



