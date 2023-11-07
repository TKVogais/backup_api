//Importação das rotas

const RouteCadastro = require('./routes/Cadastro')
const RouteHealth = require("./routes/Health")
const RouteLogin = require("./routes/Login")
const RouteDadosUsuario = require("./routes/DadosUsuario")
const RouteSaques = require("./routes/Saques")
const RouteTracking = require("./routes/Tracking")
const RouteConfirmacao = require("./routes/Confirmacao")
const RouteModoDashboard = require("./routes/ModoDashboad")
const RouteAdmin = require("./routes/Admin")

//Empacotamento das Rotas para configuração no app.js

const routes = [
    RouteCadastro,
    RouteHealth,
    RouteLogin,
    RouteDadosUsuario,
    RouteSaques,
    RouteTracking,
    RouteConfirmacao,
    RouteModoDashboard,
    RouteAdmin
]

//Exportação

module.exports = routes