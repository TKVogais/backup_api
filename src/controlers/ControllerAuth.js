const { validarToken } = require("../utils/jwt")

const VerificarToken = async (req, res, next) => {
    const tokenHeader = req.headers["authorization"]
    const token = tokenHeader.split(" ")[1]
    if (await validarToken(token)) {
        next()
    } else {
        res.json({
            status: 601,
            message: "Token inválido"
        })
    }
}

module.exports = { VerificarToken }