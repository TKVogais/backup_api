//Importação da função de validação de Tokens

const { validarToken, tokenPayload } = require("../utils/jwt")

// Função Middleware que intercepta todas requisições que chegam na API.
// Verifica se nos headers possui um token, se possuir, verifica a validade.

const VerificarToken = async (req, res, next) => {

    const tokenHeader = req.headers["authorization"]
    try {
        const token = tokenHeader.split(" ")[1]
        if (await validarToken(token)) {
            const payload = await tokenPayload(token)
            if (payload.mode == "ADMIN") {
                next()
            } else {
                if (req.app.locals.manutencao.emManutencao) {
                    return res.json({
                        status: 702,
                        message: "Página em manutenção!",
                        motivo: req.app.locals.manutencao.motivo,
                        tempo: req.app.locals.manutencao.tempo
                    })
                } else {
                    next()
                }
            }
        } else {
            return res.json({
                status: 601,
                message: "Token inválido!"
            })
        }
    } catch (error) {
        return res.json({
            status: 601,
            message: "Token inválido!"
        })
    }
}

//Exportação

module.exports = { VerificarToken }