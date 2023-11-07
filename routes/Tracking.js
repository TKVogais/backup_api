//Importação dos Módulos

const express = require('express')
const router = express.Router();

//Importação do Controller

const ControllerTracking = require("../src/controlers/ControllerTracking")

//Rotas

router.post('/desafios', ControllerTracking.Redirecionamento)

//Exportação das Rotas

module.exports = router