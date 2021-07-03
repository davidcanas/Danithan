const Command  = require("../../Structures/Command")
const { EthanEmbed, Media } = require("ethanutils")
const ReactionHandler = require('eris-reactions');
module.exports = class pingCommand extends Command {
constructor(client) {
    super(client,  { 
        name: "ping", 
        aliases: ["latência"],
        cooldown: 0,
         category: "Info",
        devOnly: false
    })
}
async execute(ctx) {
     const start = process.hrtime();
        await this.client.database.guild.findOne({guildID: ctx.msg.guildID});
        const stop = process.hrtime(start);

        const pingDB = Math.round(((stop[0] * 1e9) + stop[1]) / 1e6);
           const start1 = process.hrtime();
        const mensagemApi = await ctx.msg.channel.createMessage(`${ctx.emoji.carregando} Calculando ...`)
        const stop2 = process.hrtime(start1);

        const pingApi = Math.round(((stop2[0] * 1e9) + stop2[1]) / 1e6);
        const pingCor = Media(`${this.client.shards.get(0).latency} + ${pingDB} + ${pingApi}`)
        let cor;
        if (pingCor < 140) cor = "GREEN"
        if (pingCor > 140) cor = "YELLOW"
        if (pingCor > 170) cor = "RED"
        if (!cor) cor = "DEFAULT"
    const pingEmbed = new EthanEmbed()
    .setTitle("🏓 Pong")
    .setDescription(`Ping: ${this.client.shards.get(0).latency}ms\nPing da DB: ${pingDB} ms\nTempo de resposta ${pingApi}ms`)
    .setFooter(`${ctx.msg.author.username}#${ctx.msg.author.discriminator}`, ctx.msg.author.dynamicAvatarURL())
    .setColor(cor)
  
    mensagemApi.edit({ content: '', embed: pingEmbed.embed})
    
      const reactionListener = new ReactionHandler.continuousReactionStream(
            mensagemApi, 
            (userID) => userID !== mensagemApi.author.id && userID === ctx.msg.author.id, 
            false, 
            { maxMatches: 1, time: 900000 }
        );
    
        reactionListener.on('reacted', (event) => {
        mensagemApi.edit({content: "Oi <3", embed: null})
               });
}}