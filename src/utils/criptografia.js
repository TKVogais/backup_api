const bcrypt = require('bcrypt');

const hash = async (senha) => {
    return bcrypt.hashSync(senha, 10)
}

const compare = async (senha, hash) => {
    return bcrypt.compareSync(senha, hash)
}

module.exports = { hash, compare }