const fs = require('fs')

const backupServidor = async (app) => {
    try {
        const object = {
            tracking: app.locals.tracking,
            map: app.locals.map
        }
        fs.writeFileSync("./backup.json", JSON.stringify(object), "utf-8")
    } catch (error) {
        console.log(error)
    }
}

const loadBackup = async () => {
    try {
        const data = JSON.parse(fs.readFileSync("./backup.json", "utf-8"))
        return {
            data: data,
            status: 200,
            error: ""
        }
    } catch (error) {
        return {
            data: {},
            status: 400,
            error: error
        }
    }
}

module.exports = { backupServidor, loadBackup }