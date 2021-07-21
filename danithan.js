require("dotenv").config()
const Danithan = require('./src/Danithan');
const { EthanEmbed } = require("ethanutils")
require("./src/Structures/DaniError");
const { Manager } = require('erela.js');

const client = new Danithan("Bot " + process.env.BOT_TOKEN, {
  allowedMentions: {
    everyone: false
  },
  intents: 32767,
  restMode: true,
  defaultImageFormat: 'png',
  defaultImageSize: 2048
});
module.exports = client
client.startLoaders();
client.connect();
client.messageCollectors = []
client.reactionCollectors = []

function MsToDate(ms) {
  let seg = Math.floor(ms / 1000)
  let minutes = 0
  let hours = 0
  let days = 0

  while (seg >= 60) minutes++, seg -= 60
  while (minutes >= 60) hours++, minutes -= 60
  while (hours >= 24) days++, hours -= 24
  return {
    dias: days,
    horas: hours,
    minutos: minutes,
    segundos: seg
  }
};

const nodes = [
  {
    identifier: 'Danithan Caraibas Node',
    host: 'lavalink-danithan.herokuapp.com',
    port: 80,
    password: process.env.LAVALINK_PASS,
    retryAmount: 30,
    retryDelay: 3000,
    secure: false
  }
];

client.manager = new Manager({
  nodes,
  send: (id, payload) => {
    const guild = client.guilds.get(id);
    if (guild) guild.shard.ws.send(JSON.stringify(payload))
  }
});


client.once('ready', () => {
  client.manager.init(client.user.id);
});
client.lavalinkPings = new Map();

client.manager.on('nodeConnect', (node) => {
  client.lavalinkPings.set(node.identifier, {});

  const sendPing = () => {
    node.send({
      op: 'ping'
    });
    client.lavalinkPings.get(node.identifier).lastPingSent = Date.now();
  };

  sendPing();
  setInterval(() => {
    sendPing();
  }, 45000);
});

client.manager.on('nodeError', (node, error) => {
  if (error && error.message.includes('"pong"')) {
    const lavalinkPing = client.lavalinkPings.get(node.identifier);
    lavalinkPing.ping = Date.now() - lavalinkPing.lastPingSent;
    return;
  }
  console.log(`[Lavalink]: Ocorreu um erro no node ${node.identifier}.\nErro: ${error.message}`);
});

//Para usar o valor do ping do lavalink num comando por exemplo é so usar
//client.lavalinkPings.get(client.manager.nodes.first().identifier).ping
client.on('error', async (err) => {
  console.error("[Erro Recebido da index.js]: " + err);
});
client.manager.on("trackStart", async (player, track) => {
  let gRes = await client.database.guild.findOne({ guildID: player.guild })


let language = gRes.Settings.lang
let t = await i18next.getFixedT(language, ["commands", "events"]);

  const channel = client.getChannel(player.textChannel);
  // Send a message when the track starts playing with the track name and the requester's Discord tag, e.g. username#discriminator
  const embedaa = new EthanEmbed()
    .setTitle(t("events:trackStart.title"))
    .addField(t("events:trackStart.music"), `[${track.title}](${track.uri})`)
    .addField(t("events:trackStart.requester"), track.requester.username)
    .setColor("RANDOM")
    .setFooter(t("events:trackStart.footer"))
  const mensagem = await channel.createMessage(embedaa)
  setTimeout(() => {
    const verif = client.getChannel(player.textChannel).messages.get(mensagem.id)
    if (verif) verif.delete()
  }, 30000);
})
client.manager.on('trackError', (player, track, message) => {
  console.log(message.error)
})
client.on("rawWS", async (packet) => {
  client.manager.updateVoiceState(packet)
  if (packet.t === "INTERACTION_CREATE" && packet.d.type === 3) {
    console.log("Id da guild" + packet.d.guild_id);
    console.log("Channel" + packet.d.channel_id);
    console.log("ID Message" + packet.d.id);
    console.log(packet);

    if (packet.d.data.custom_id === "teste") {
      client.guilds.get(packet.d.guild_id).channels.get(packet.d.channel_id).messages.get(packet.d.message.id)
        .edit("Alguém clicou numa interação com o custom_id " + packet.d.data.custom_id + " clicado por: " + packet.d.member.nick);
    };
    if (packet.d.data.custom_id === "delmsgeval") {
      if (packet.d.member.user.id !== "791347446298312724" && packet.d.member.user.id !== "718078381199065150" && packet.d.member.user.id !== "852650555254767676") return console.log("Intruso");

      client.guilds.get(packet.d.guild_id).channels.get(packet.d.channel_id).messages.get(packet.d.message.id).delete();
    };
  };
});

