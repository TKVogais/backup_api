//Importação dos Módulos

const express = require('express')
const router = express.Router();

//Importação do Controller

const ControllerLogin = require('../src/controlers/ControllerLogin')

//Rotas

router.post('/login', ControllerLogin.Login)

//Exportação das Rotas

module.exports = router