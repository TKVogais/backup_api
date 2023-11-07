const middlewareRotas = async (req, res, next) => {
    const token = req.body.token
    const tracking = req.app.locals.tracking
    const map = req.app.locals.map
    const rota = req.headers.referer.split('/confirmacao/')[1]

    let usuario = {}
    let location = 0
    let idUsuario = 0
    let userTask = false

    tracking.forEach((track, index) => {
        if (track.token == token) {
            location = index
            return
        }
    })

    usuario = tracking[location]
    idUsuario = usuario.idUsuario
    const rotaUsuario = usuario.rota - 1

    map[rotaUsuario][rota].forEach((ID) => {
        if (idUsuario == ID) {
            return userTask = true
        }
    })

    if (userTask) {
        return res.json({
            status: 400,
            message: "Realize uma tarefa para realizar a confirmação!"
        })
    } else {
        next()
    }

}

module.exports = { middlewareRotas }