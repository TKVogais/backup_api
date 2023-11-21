//Importação das consultas no banco de dados.

const QueryDadosUsuario = require("../querys/QueryDadosUsuario")

//Função que confirmar as tarefas

const ConfirmarTarefa = async (req, res) => {

    const rota = req.headers.referer.split('/confirmacao/')[1]


    let tracking = req.app.locals.tracking
    let ranking = req.app.locals.ranking
    let token = req.body.token
    let tokenValido = false
    let location = 0
    let usuario = {}
    let saldo = 0

    //Busca dentro do Array se token informado é válido.

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
            usuario.clicks = 1
            usuario.rota = usuario.rota + 1
        } else {
            usuario.clicks++
        }

        req.app.locals.map[`R${usuario.rota}${rota}`].push(usuario.idUsuario)
        switch (usuario.ultimaDificuldade) {
            case "facil": saldo = 0.008; break;
            case "medio": saldo = 0.010; break;
            case "dificil": saldo = 0.019; break;
        }
        ranking[location].valor += saldo
        ranking[location].desafios += 1
        const [response] = await QueryDadosUsuario.AtualizarSaldo(usuario.idUsuario, saldo, "mais", true)
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