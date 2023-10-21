require('dotenv').config()
const Sequelize = require("sequelize")
let db, user, pass, host

if (process.env.NODE_DATABASE_MODE == "aws") {
    db = process.env.NODE_DB_AWS
    user = process.env.NODE_USER_AWS
    pass = process.env.NODE_PASS_AWS
    host = process.env.NODE_HOST_AWS
} else {
    db = process.env.NODE_DB_LOCAL
    user = process.env.NODE_USER_LOCAL
    pass = process.env.NODE_PASS_LOCAL
    host = process.env.NODE_HOST_LOCAL
}

const sequelize = new Sequelize(db, user, pass, {
    dialect: 'mysql',
    logging: false,
    host: host
})
module.exports = sequelize