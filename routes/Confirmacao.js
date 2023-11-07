//Importação dos Módulos

const express = require('express')
const router = express.Router();

//Importação do Controller

const ControllerDesafio = require("../src/controlers/ControllerDesafios")
const ControllerTrap = require("../src/controlers/ControllerHost")
const ControlerConfirmacao = require("../src/controlers/ControllerConfirmacao")
const { middlewareRotas } = require("../src/middlewares/MiddlewareRotas")
//Importação da Configuração das Rotas

const routes = require("../src/utils/routes")

//Rotas

routes.forEach((route) => {
    router.get(`/confirmacao/${route}`, ControllerTrap.VerificarHost, ControllerDesafio.RenderDesafioVerificacao)
})
router.post("/confirmar-tarefa", middlewareRotas, ControlerConfirmacao.ConfirmarTarefa)

//Exportação das Rotas
module.exports = router