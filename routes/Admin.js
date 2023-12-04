//Importação dos Módulos

const express = require('express')
const router = express.Router();
const MiddlewareAdmin = require("../src/middlewares/MiddlewareAdmin")
//Importação do Controller

const ControllerAdmin = require('../src/controlers/ControllerAdm')

//Rotas

router.post('/admin/dados-admin', MiddlewareAdmin, ControllerAdmin.listarDadosAdmin)

router.get('/admin/validate', MiddlewareAdmin, (req, res) => {
    res.json({
        status: 200,
        message: "Token Válido"
    })
})

router.get('/validate', ControllerAdmin.ValidarTokenUser)
router.get('/admin/servidor-monitoramento', MiddlewareAdmin, ControllerAdmin.monitoramentoServidor)
router.get('/admin/ranking', MiddlewareAdmin, ControllerAdmin.ranking)
router.get('/admin/mapeamento', MiddlewareAdmin, ControllerAdmin.mapeamento)
router.post('/admin/alterar-status', MiddlewareAdmin, ControllerAdmin.alterarStatusConta)
router.post('/admin/alterar-status-saque', MiddlewareAdmin, ControllerAdmin.alterarStatusSaque)
router.post('/admin/adicionar-rotas', MiddlewareAdmin, ControllerAdmin.cadastarRotas)
router.post('/admin/manutencao', MiddlewareAdmin, ControllerAdmin.manutencaoPlataforma)
router.post('/admin/avatar', MiddlewareAdmin, ControllerAdmin.cadastarAvatares)
router.get('/admin/sincronizar-servidor', MiddlewareAdmin, ControllerAdmin.sincronizarServidor)
router.get('/admin/backup', MiddlewareAdmin, ControllerAdmin.restaurarServidor)
router.post('/admin/alterar-status-chamado', MiddlewareAdmin, ControllerAdmin.alterarChamado)

//Exportação das Rotas
module.exports = router