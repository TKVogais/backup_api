const express = require('express')
const router = express.Router();
const ControllerSaques = require("../src/controlers/ControllerSaques")
const ControllerAuth = require("../src/controlers/ControllerAuth")
//Rotas

router.post('/solicitar-saque',  ControllerSaques.SolicitacaoSaque)

//Exportação das Rotas
module.exports = router