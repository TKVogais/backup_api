require('dotenv').config()

const jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.NODE_JWT_KEY

const gerarToken = async (idUsuario) => {
    const data = new Date()
    const obj = {
        id: idUsuario,
        expiracao: `${data.getHours()}:${data.getMinutes() + 10}`
    }
    return jwt.sign(obj, SECRET_KEY, { expiresIn: 600 })
}

const validarToken = async (token) => {
    return jwt.verify(token, SECRET_KEY, (err, decoded)=>{
        if(err) return false
        return true
    })
}

module.exports = { gerarToken, validarToken }