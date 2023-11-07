const geradorTokenConfirmacao = require("../utils/stringAleatoria")
const { rotas } = require("../utils/config-route-sua-url")

const Redirecionamento = async (req, res) => {
    const idUsuario = req.body.idUsuario
    const dificuldade = req.body.dificuldade
    const nome = req.body.usuario
    const limite = req.app.locals.limite
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
            usuario: nome,
            rota: 1,
            clicks: 0,
            token: token,
            ultimaDificuldade: ""
        })
        req.app.locals.ranking.push({
            idUsuario: idUsuario,
            usuario: nome,
            valor: 0,
            desafios: 0
        })
        location = req.app.locals.tracking.length - 1
    }
    let nRota = req.app.locals.tracking[location].rota - 1
    let clicks = req.app.locals.tracking[location].clicks

    if (clicks + 1 > 3) {
        nRota += 1
        clicks = 1
        if (nRota + 1 > limite) {
            return res.json({
                limite: true,
                message: "Você atingiu o limite diário de desafio!"
            })
        }
    } else {
        clicks += 1
    }
    req.app.locals.tracking[location].ultimaDificuldade = dificuldade
    req.app.locals.tracking[location].token = token

    const posicao = `${dificuldade}${clicks}`
    try {
        req.app.locals.socket.emit("mapeamento", req.app.locals.tracking)
    } catch (error) {

    }
    res.json({
        valor: valor,
        URL: `${rotas[nRota][posicao]}`,
        token: token
    })
}

module.exports = { Redirecionamento }   
