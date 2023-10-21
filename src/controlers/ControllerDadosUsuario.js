const QueryDadosUsuario = require("../querys/QueryDadosUsuario")

const DadosDashboard = async (req, res) => {
    const id = req.body.idUsuario
    let responseUsuario = await QueryDadosUsuario.DadosUsuario(id)
    let responseContas = await QueryDadosUsuario.DadosContas(id)
    let responseSaques = await QueryDadosUsuario.DadosSaques(id)
    res.json({
        usuario: responseUsuario,
        contas: responseContas,
        saques: responseSaques
    })
}

module.exports = { DadosDashboard }