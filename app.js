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
const { loadInfo} = require("./src/utils/monitoramento")

//Importação das configurações de rotas

const { rotas, mapeamentoRotas } = require("./src/utils/config-route-sua-url");


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
app.locals.limite = rotas.length
app.locals.map = []
app.locals.ranking = []
app.locals.banlist = []

rotas.forEach((rota) => {
    app.locals.map.push(mapeamentoRotas)
})

const PORT = process.env.PORT || 4000;


//Carregamento e Configuração das Rotas

routes.forEach((route) => {
    app.use('/api', route)
})

//Iniciando os servidores


ws.on('connection', async (socket) => {
    socket.on("disconnect", () => {

    })
    app.locals.socket = socket
    await loadInfo(socket)
});

server.listen(PORT, () => {
    console.log("Rodando o API na porta " + PORT);
})



