const RenderDesafioVerificacao = (req, res) => {
    console.log("===========HEADERS============")
    console.log(req.headers)
    console.log("==============================")
    res.render("../views/confirmacao")
}

module.exports = { RenderDesafioVerificacao }