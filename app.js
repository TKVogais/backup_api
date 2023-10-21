//Carregando Módulos

const express = require("express");
const app = express();
const cors = require('cors');
const routes = require("./config-routes")
const delay = require("./src/utils/delay")
const path = require('path')
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


//Array de contas para verificar

app.locals.tracking = []


const PORT = process.env.PORT || 4000;


//Carregamento e Configuração das Rotas

routes.forEach((route) => {
    app.use('/api', route)
})
// Iniciando bot verificador de contas

// VerificadorContas(app.locals.contas)

setInterval(async () => {
    console.log(app.locals.tracking)
}, 3000)
//Iniciando o Servidor

app.listen(PORT, () => {
    console.log("Rodando o API na porta " + PORT);
})  