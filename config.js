const { config } = require('dotenv')
const { join } = require("path")

config({
    path: join(__dirname, ".env")
});

module.exports = {
    token: process.env.BOT_TOKEN,
    mongo: process.env.MONGOURI
}