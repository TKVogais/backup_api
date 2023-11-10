const VerificarHost = async (req, res, next) => {
    const referer = req.headers.referer
    if (referer.includes("https://suaurl.com")) {
        next()
    } else {
        res.render("../views/error")
    }
}

module.exports = { VerificarHost }