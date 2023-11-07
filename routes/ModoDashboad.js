//Importação dos Módulos

const express = require('express')
const router = express.Router();
const { tokenPayload, validarToken } = require("../src/utils/jwt")

//Rotas

router.get('/modo-dashboard', async (req, res) => {
    try {
        const tokenHeader = req.headers["authorization"]
        const token = tokenHeader.split(" ")[1]

        if (await validarToken(token)) {
            const payload = await tokenPayload(token)
            req.app.locals.banlist.forEach((id, index) => {
                if (id == payload.id) {
                    return res.json({
                        status: 601,
                        message: "Usuário Banido!",
                        mode: "USER"
                    })
                }
            })
            res.json({
                status: 200,
                mode: payload.mode
            })
        } else {    
            res.json({
                status: 601,
                message: "Token inválido",
                mode: "USER"
            })
        }
    } catch (error) {
        res.json({
            status: 601,
            message: "Token inválido",
            mode: "USER"
        })
    }
})

//Exportação das Rotas
module.exports = router