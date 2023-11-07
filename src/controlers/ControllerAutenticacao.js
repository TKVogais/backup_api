//Importação da função de validação de Tokens

const { validarToken } = require("../utils/jwt")

// Função Middleware que intercepta todas requisições que chegam na API.
// Verifica se nos headers possui um token, se possuir, verifica a validade.

const VerificarToken = async (req, res, next) => {
    const tokenHeader = req.headers["authorization"]
    const token = tokenHeader.split(" ")[1]
    if (await validarToken(token)) {
        next()
    } else {
        res.json({
            status: 601,
            message: "Token inválido!"
        })
    }
}

//Exportação

module.exports = { VerificarToken }