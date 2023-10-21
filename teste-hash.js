
const { gerarToken, validarToken } = require("./src/utils/jwt");

// console.log(`Token de Autenticação: ${gerarToken(1)}`)
(async function () {
    const token = await gerarToken(1)
    console.log(await validarToken(token))
})()