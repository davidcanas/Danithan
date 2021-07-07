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
  
    const pingEmbed = new EthanEmbed()
    .setTitle("🏓 Pong")
    .setDescription(`<:clock2:862344276028555264> \`${pingApi}ms\`\n<:internet:797178541702774834> \`${this.client.shards.get(0).latency}ms\`\n<:MongoDB:862343156854423552> \`${pingDB}ms\`\n<:lava:862345050667089950> \`${this.client.lavalinkPings.get(this.client.manager.nodes.first().identifier).ping}ms\``)
    .setFooter(`${ctx.msg.author.username}#${ctx.msg.author.discriminator}`, ctx.msg.author.dynamicAvatarURL())
    .setColor("RED")
  
    mensagemApi.edit({ content: '', embed: pingEmbed.embed})
    mensagemApi.addReaction("help:862349947814019072")
      const reactionListener = new ReactionHandler.continuousReactionStream(
            mensagemApi, 
            (userID) => userID !== mensagemApi.author.id && userID === ctx.msg.author.id, 
            false, 
            { maxMatches: 10, time: 900000 }
        );
    
        reactionListener.on('reacted', (event) => {
         if (event.emoji.id === "862349947814019072") {
            const pingHelpEmbed = new EthanEmbed()
            .setTitle("🏓 Ajuda do Comando de Ping")
            .setDescription(`<:clock2:862344276028555264> - \`Representa o Tempo de resposta do Danithan em ms\`\n<:internet:797178541702774834> \`Representa o Ping da API do discord\`\n<:MongoDB:862343156854423552> \`Representa o ping da Databse (MongoDB)\`\n<:lava:862345050667089950> \`Representa o ping do lavalink\``)
            .setFooter(`${ctx.msg.author.username}#${ctx.msg.author.discriminator}`, ctx.msg.author.dynamicAvatarURL())
            .setColor("RED")
            mensagemApi.edit({content: "", embed: pingHelpEmbed.embed})
            mensagemApi.removeReaction("help:862349947814019072")
            mensagemApi.addReaction("◀️")

         }  
         if (event.emoji.name === "◀️") {
            mensagemApi.edit({content: "", embed: pingEmbed.embed})
            mensagemApi.removeReaction("◀️")
            mensagemApi.addReaction("help:862349947814019072")
         }     
        });
}}