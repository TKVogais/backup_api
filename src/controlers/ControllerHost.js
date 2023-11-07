const VerificarHost = async (req, res, next) => {
    const referer = req.headers.referer
    if (referer == "http://localhost:3000") {
        next()
    } else {
        res.render("../views/error")
    }
}

module.exports = { VerificarHost }