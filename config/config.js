require('dotenv').config()

const config = {
    env: process.env.NODE_ENV || 'dev',
    port: process.env.PORT || 3000,
    db_user: process.env.DB_USER,
    db_host: process.env.DB_HOST,
    db_port: process.env.DB_PORT,
    db_password: process.env.DB_PASSWORD,
    db_name: process.env.DB_NAME
}

module.exports = {config}