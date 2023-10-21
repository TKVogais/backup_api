const express = require('express')
const router = express.Router();
const ControllerDesafio = require("../src/controlers/ControllerDesafios")
const ControllerTrap = require("../src/controlers/ControllerSuaURL")
const ControlerConfirmacao = require("../src/controlers/ControllerConfirmacao")
const routes = require("../src/utils/routes")
//Rotas



routes.forEach((route) => {
    router.get(`/confirmacao/${route}`, ControllerTrap.VerificarHost, ControllerDesafio.RenderDesafioVerificacao)
})
router.post("/confirmar-tarefa", ControlerConfirmacao.ConfirmarTarefa)

//Exportação das Rotas
module.exports = router