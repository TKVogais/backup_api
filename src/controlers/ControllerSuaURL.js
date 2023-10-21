const VerificarHost = async (req, res, next) => {
    const host = req.headers.host
    console.log(host)
    if (host === "localhost:4000") {
        next()
    } else {
        res.render("../views/trap")
    }
}

module.exports = { VerificarHost }