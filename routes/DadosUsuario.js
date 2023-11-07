//Importação dos Módulos

const express = require('express')
const router = express.Router();

//Importação dos Controllers

const ControllerDadosUsuario = require('../src/controlers/ControllerDadosUsuario')
const ControllerAutenticacao = require("../src/controlers/ControllerAutenticacao")

//Rotas

router.post('/dados-usuario', ControllerAutenticacao.VerificarToken, ControllerDadosUsuario.DadosDashboard)
router.post('/atualizar-perfil', ControllerAutenticacao.VerificarToken, ControllerDadosUsuario.AtualizarPerfil)

//Exportação das Rotas
module.exports = router 