const express = require('express')
const router = express.Router();
const ControllerCadastro = require('../src/controlers/ControllerCadastro')

//Rotas

router.post('/inserir-usuario', ControllerCadastro.CadastroUsuario)

//Exportação das Rotas
module.exports = router