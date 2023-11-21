const VerificarHost = async (req, res, next) => {
    const mode = "local"    
    const host = mode == "nuvem" ? "https://suaurl.com" : "http://localhost:3000/"
    const referer = req.headers.referer
    if (referer.includes(host)) {
        next()
    } else {
        res.render("../views/error")
    }
}

module.exports = { VerificarHost }