const VerificarHost = async (req, res, next) => {
    const referer = req.headers.referer
    console.log("===========REQUISIÇÃO============")
    console.log(req)
    console.log("==============================")
    if (referer === "https://suaurl.com/") {
        next()
    } else {
        res.render("../views/trap")
    }
}

module.exports = { VerificarHost }