//Importação dos Módulos

const express = require('express')
const router = express.Router();

//Importação do Controller

const ControllerCadastro = require('../src/controlers/ControllerCadastro')

//Rotas

router.post('/inserir-usuario', ControllerCadastro.CadastroUsuario)

//Exportação das Rotas
module.exports = router