const criarNavegador = require("./intancia-bot")
const delay = require("../../src/utils/delay")

const VerificadorContas = async (contas = []) => {
    const Navegador = await criarNavegador()
    setInterval(async () => {
        if (contas.length > 0) {
            contas.forEach(async (conta) => {
                if (!conta.verificada) {
                    try {
                        await Navegador.get(`https://instagram.com/${conta.conta}`)
                        await delay(15000)
                    } catch (error) {
                        console.log(error)
                    }
                }
            })
        } else {
            console.log("Nenhuma conta para ser verificada!")
        }
    }, 10000);
}

module.exports = VerificadorContas 