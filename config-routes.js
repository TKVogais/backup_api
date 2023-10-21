const RouteCadastro = require('./routes/Cadastro')
const RouteHealth = require("./routes/Health")
const RouteLogin = require("./routes/Login")
const RouteDadosUsuario = require("./routes/DadosUsuario")
const RouteSaques = require("./routes/Saques")
const RouteTracking = require("./routes/Tracking")
const RouteConfirmacao = require("./routes/Confirmacao")


const routes = [
    RouteCadastro,
    RouteHealth,
    RouteLogin,
    RouteDadosUsuario,
    RouteSaques,
    RouteTracking,
    RouteConfirmacao
]

module.exports = routes