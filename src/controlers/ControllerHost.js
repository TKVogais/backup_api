//Configuração das Variáveis de Ambiente.

require('dotenv').config()

const VerificarHost = async (req, res, next) => {
    const mode = "nuvem-prod"
    let host = ""

    switch (mode) {
        case "nuvem-prod":
            host = "https://suaurl.com"
            break;
        case "nuvem-dev":
            host = "https://www.cherrysocial.com.br/"
            break;
        case "local":
            host = "http://localhost:3000"
            break;
    }
    try {
        const referer = req.headers.referer
        if (referer.includes(host)) {
            next()
        } else {
            res.render("../views/error")
        }
    } catch (error) {
        res.render("../views/error")
    }
}

module.exports = { VerificarHost }