const geradorTokenConfirmacao = require("../utils/stringAleatoria")

const Redirecionamento = async (req, res) => {

    const idUsuario = req.body.idUsuario
    const dificuldade = req.body.dificuldade
    const routes = [{
        facil: "http://localhost:4000/api/confirmacao/facil100",
        medio: "http://localhost:4000/api/confirmacao/medio100",
        dificil: "http://localhost:4000/api/confirmacao/dificil100",
    }]
    let valor = 0

    switch (dificuldade) {
        case "facil": valor = 0.008; break;
        case "medio": valor = 0.010; break;
        case "dificil": valor = 0.019; break;
    }

    let usuario = false
    let location = 0
    let tokenCriado = true
    let token
    req.app.locals.tracking.forEach((track, index) => {
        if (track.idUsuario == idUsuario) {
            location = index
            usuario = true
            return
        }
    })
    while (tokenCriado) {
        token = geradorTokenConfirmacao(10)
        req.app.locals.tracking.forEach((track) => {
            if (track.token == token) {
                return
            }
        })
        tokenCriado = false
    }
    if (!usuario) {
        req.app.locals.tracking.push({
            idUsuario: idUsuario,
            rota: 1,
            clicks: 0,
            token: token,
            ultimaDificuldade: ""
        })
    }
    const nRota = req.app.locals.tracking[location].rota - 1
    req.app.locals.tracking[location].ultimaDificuldade = dificuldade
    req.app.locals.tracking[location].token = token
    res.json({
        valor: valor,
        URL: `${routes[nRota][dificuldade]}`,
        token: token
    })
}

module.exports = { Redirecionamento }   
