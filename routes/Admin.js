//Importação dos Módulos

const express = require('express')
const router = express.Router();
const MiddlewareAdmin = require("../src/middlewares/MiddlewareAdmin")
//Importação do Controller

const ControllerAdmin = require('../src/controlers/ControllerAdm')

//Rotas

router.get('/admin/dados-admin', MiddlewareAdmin, ControllerAdmin.listarDadosAdmin)

router.get('/admin/validate', MiddlewareAdmin, (req, res) => {
    res.json({
        status: 200,
        message: "Token Válido"
    })
})

router.get('/validate', ControllerAdmin.ValidarTokenUser)


router.post('/admin/alterar-status', MiddlewareAdmin, ControllerAdmin.alterarStatusConta)
router.post('/admin/alterar-status-saque', MiddlewareAdmin, ControllerAdmin.alterarStatusSaque)
//Exportação das Rotas
module.exports = router