const os = require('os')
const osu = require('node-os-utils')

const mem = osu.mem
const cpu = osu.cpu


const loadInfo = async (socket) => {
    setInterval(async () => {
        let memoria = await mem.info()
        let processador = await cpu.usage()
        let monitServer = {
            processador: {
                nome: os.cpus()[0].model,
                clock: os.cpus()[0].speed,
                uso: processador,
                cores: os.cpus().length
            },
            plataforma: os.platform(),
            memoria: {
                total: memoria.totalMemMb / 1024,
                emUso: memoria.usedMemMb / 1024,
                livre: memoria.freeMemMb / 1024,
                percLivre: memoria.freeMemPercentage,
                percEmUso: memoria.usedMemPercentage,
            }

        }
        socket.emit("monit-server", monitServer)
    }, 2000)
}


const mapeamento = async (socket, map) => {
    setInterval(async () => {
        socket.emit("mapeamento", map)
    }, 2000)
}

const ranking = async (socket, ranking) => {
    setInterval(async () => {
        socket.emit("ranking", ranking)
    }, 2000)
}

module.exports = { loadInfo, mapeamento, ranking }