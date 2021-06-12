require('dotenv').config({
    path: '.env'
});

const Danithan = require('./src/Danithan');

require("./src/Structures/DaniError");
require("./src/api/app");

const client = new Danithan(process.ENV.token, {
    allowedMentions: {
        everyone: false
    },
    intents: 32767,
    restMode: true, 
    defaultImageFormat: 'png', 
    defaultImageSize: 2048
});
      
client.startLoaders();
client.connect();


client.on('error', async(err) => {
    console.error("[Erro Recebido da index.js]: " + err);
});

client.on("rawWS", async(packet) => {
    if (packet.t === "INTERACTION_CREATE" && packet.d.type === 3) {
        console.log("Id da guild" + packet.d.guild_id);
        console.log("Channel" + packet.d.channel_id);
        console.log("ID Message" + packet.d.id);
        console.log(packet);

        if(packet.d.data.custom_id === "teste") {  
            client.guilds.get(packet.d.guild_id).channels.get(packet.d.channel_id).messages.get(packet.d.message.id)
            .edit("Alguém clicou numa interação com o custom_id " + packet.d.data.custom_id + " clicado por: " + packet.d.member.nick) ;
        };
        if (packet.d.data.custom_id === "delmsgeval") {
            if (packet.d.member.user.id !== "791347446298312724" && packet.d.member.user.id !== "718078381199065150") return console.log("Intruso");

            client.guilds.get(packet.d.guild_id).channels.get(packet.d.channel_id).messages.get(packet.d.message.id).delete();
        };   
    };
});


module.exports = client;
