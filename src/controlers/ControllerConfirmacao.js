const QueryDadosUsuario = require("../querys/QueryDadosUsuario")

const ConfirmarTarefa = async (req, res) => {

    let tracking = req.app.locals.tracking
    let token = req.body.token
    let tokenValido = false
    let location = 0
    let usuario = {}
    let saldo = 0

    tracking.forEach((track, index) => {
        if (track.token === token) {
            tokenValido = true
            location = index
            return
        }
    })

    if (tokenValido) {
        usuario = tracking[location]
        usuario.token = ""
        if (usuario.clicks >= 3) {
            usuario.clicks = 0
            usuario.rota++
        } else {
            usuario.clicks++
        }
        switch (usuario.ultimaDificuldade) {
            case "facil": saldo = 0.008; break;
            case "medio": saldo = 0.010; break;
            case "dificil": saldo = 0.019; break;
        }
        const [response] = await QueryDadosUsuario.AtualizarSaldo(usuario.idUsuario, saldo, "mais")
        console.log(response)
        if (response[1] === 1) {
            res.json({
                status: 200,
                message: "Tarefa Confirmada!"
            })
        } else {
            res.json({
                status: 401,
                message: "Falha ao confirmar a tarefa!"
            })
        }
    } else {
        return res.json({
            status: 401,
            message: "Token Inválido"
        })
    }
}

module.exports = { ConfirmarTarefa }