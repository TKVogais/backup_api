const express = require('express')
const router = express.Router();
const ControllerDadosUsuario = require('../src/controlers/ControllerDadosUsuario')
const ControllerAuth = require("../src/controlers/ControllerAuth")
//Rotas

router.post('/dados-usuario', ControllerAuth.VerificarToken, ControllerDadosUsuario.DadosDashboard)

//Exportação das Rotas
module.exports = router