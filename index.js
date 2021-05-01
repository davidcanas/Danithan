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
const nodes = [
    {
        identifier: 'Danithan Caraibas Node',
        host: "danithanlavalink.herokuapp.com",
        port: 80,
        password: "2008david",
        retryAmount: 30,
        retryDelay: 5000,
        secure: false,
    },
]
client.music = new Manager({
    nodes,
    autoPlay: true,
    send(id, payload) {
        const guild = client.guilds.get(id);
        if (guild) guild.shard.sendWS(payload);
    },
   
});
client.music.on('nodeConnect', async node => {
    console.log(`Node ${node.options.identifier} do Lavalink com o IP ${node.options.host}:${node.options.port} conectado!`);

    /************************** This code is only for lavalinks hosted on heroku **************************/
    const player = client.music.create({
        guild: process.env.GUILDID,
        voiceChannel: process.env.GUILDCH,
        textChannel: process.env.GUILDCHTEXT,
        selfDeafen: true,
        selfMute: true
    });

    player.connect();

    const { tracks } = await client.music.search('https://www.youtube.com/watch?v=KMU0tzLwhbE', client.user);

    player.queue.add(tracks[0]);

    if (!player.playing)
        player.play();
    /*****************************************************************************************************/
});

client.music.on('nodeReconnect', node => {
    console.log(`Node ${node.options.identifier} do Lavalink com o IP ${node.options.host}:${node.options.port} re-conectado!`);
});

client.music.on('nodeError', (node, error) => {
    console.log(`Ocorreu um erro no Node ${node.options.identifier}. Erro: ${error.message}`);
});

client.music.on('nodeDisconnect', (node, error) => {
    console.log(`O node do lavalink ${node.options.identifier} desconectou inesperadamente.`);
});
client.music.on('trackStart', (player, track) => {
    /* This code is only for lavalinks hosted on heroku */
    if (player.guild == process.env.GUILDID) {
        setTimeout(() => {
            player.pause(true);
        }, 3000);
        return;
    }
    /***************************************************/

    const embed = new MessageEmbed()
        .setColor("RANDOM")
        .setTitle('<a:Labfm:482171966833426432> A Tocar')
        .addField(":page_with_curl: Nome:", '`' + track.title + '`')
        .addField(":robot: Enviado por:", '`' + track.author + '`')
        .addField(":watch: Duração:", '`' + mstohour(track.duration) + '`')
        .setURL(track.uri)
        .setThumbnail(track.displayThumbnail())
        .setTimestamp()
        .setFooter(player.queue.current.requester.tag, player.queue.current.requester.displayAvatarURL({ dynamic: true }));

    client.channels.cache.get(player.textChannel).send(embed);
});

client.music.on('trackStuck', (player, track, message) => {
    client.guilds.get(player.guild).channels.get(player.textChannel).createMessage(`F`)
    client.music.players.get(player.guild).destroy();
    console.log(`[Erro] Track Error: ${message.error}`);
});

client.music.on('trackError', (player, track, message) => {
    client.guilds.get(player.guild).channels.get(player.textChannel).createMessage(`F`)
    if (player.guild === process.env.GUILID) {
        client.music.players.get(player.guild).destroy();

        setTimeout(async () => {
            /************** This code is only for lavalinks hosted on heroku **************/
            const player = client.music.create({
                guild: process.env.GUILDID,
                voiceChannel: process.env.GUILDCH,
                textChannel: process.env.GUILDCHTEXT,
                selfDeaf: true,
                selfMute: true
            });

            player.connect();

            const { tracks } = await client.music.search('https://www.youtube.com/watch?v=KMU0tzLwhbE', client.user);

            player.queue.add(tracks[0]);

            if (!player.playing)
                player.play();
            /*****************************************************************************/
        }, 5000);
        return;
    }
    client.music.players.get(player.guild).destroy();
    console.log(`F (erro)`);
});

client.music.on('queueEnd', player => {
    const channel =   client.guilds.get(player.guild).channels.get(player.textChannel)
    if (channel) channel.createMessage('F');
    client.music.players.get(player.guild).destroy();
});


client.on("rawWS", (d) => client.music.updateVoiceState(d));
client.startLoaders()
client.connect()
module.exports = client


client.on('error', err => {
 
        console.error("[Erro Recebido da index.js]: " + err);
  
 })