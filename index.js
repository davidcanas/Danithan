const Danithan = require('./src/Danithan')
const config = require('./config')
const { Manager } = require('erela.js');

const client = new Danithan(config.token, {
    allowedMentions: {
        everyone: false
    },
    intents: 32767,
    restMode: true, 
    defaultImageFormat: 'png', 
    defaultImageSize: 2048
}, config);
      
client.startLoaders()
client.connect()
module.exports = client

require("./src/api/app")
client.on('error', err => {
 
        console.error("[Erro Recebido da index.js]: " + err);
  
 })