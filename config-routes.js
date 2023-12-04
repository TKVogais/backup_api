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
const RouteChamado = require("./routes/Chamados")
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
    RouteAdmin,
    RouteChamado
]

//Exportação

module.exports = routes