//Configuração das Variáveis de Ambiente.

require('dotenv').config()

const VerificarHost = async (req, res, next) => {
    const mode = process.env.NODE_MODE_HOST
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
    const referer = req.headers.referer
    if (referer.includes(host)) {
        next()
    } else {
        res.render("../views/error")
    }
}

module.exports = { VerificarHost }