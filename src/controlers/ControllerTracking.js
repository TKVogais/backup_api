const geradorTokenConfirmacao = require("../utils/stringAleatoria")


const Redirecionamento = async (req, res) => {
    if (req.app.locals.rotas.length > 0) {
        const idUsuario = req.body.idUsuario
        const avatar = req.body.avatar
        const dificuldade = req.body.dificuldade
        const nome = req.body.usuario
        const limite = req.app.locals.limite
        const rotas = req.app.locals.rotas
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
                ultimaDificuldade: "",
                avatar: avatar,
            })
            location = req.app.locals.tracking.length - 1
        }
        let nRota = req.app.locals.tracking[location].rota - 1
        let clicks = req.app.locals.tracking[location].clicks

        if (clicks + 1 > 3) {
            req.app.locals.tracking[location].rota += 1
            req.app.locals.tracking[location].clicks = 0
            nRota += 1
            clicks = 1
            if (nRota + 1 > limite) {
                return res.json({
                    status: 200,
                    semRota: false,
                    limite: true,
                    VPN: false,
                    message: "Você atingiu o limite diário de desafio!"
                })
            }
        } else {
            clicks += 1
        }


        req.app.locals.tracking[location].ultimaDificuldade = dificuldade
        req.app.locals.tracking[location].token = token
        req.app.locals.tracking[location].avatar = avatar

        const posicao = `${dificuldade}${clicks}`

        return res.json({
            status: 200,
            message: "Rota localizada!",
            valor: valor,
            limite: false,
            semRota: false,
            VPN: false,
            URL: `${rotas[nRota][posicao]}`,
            token: token
        })
    } else {
        return res.json({
            status: 602,
            message: "Nenhuma rota localizada",
            limite: false,
            semRota: true,
            VPN: false,
        })
    }
}

module.exports = { Redirecionamento }   
