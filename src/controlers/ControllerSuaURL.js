const VerificarHost = async (req, res, next) => {
    const host = req.headers.host
    console.log("===========HEADERS============")
    console.log(req.headers)
    console.log("==============================")
    console.log("===========HOST============")
    console.log(host)
    console.log("==============================")
    if (host === "localhost:4000") {
        next()
    } else {
        res.render("../views/trap")
    }
}

module.exports = { VerificarHost }