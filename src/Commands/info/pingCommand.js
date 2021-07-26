const Command  = require("../../Structures/Command")
const { EthanEmbed, ReactionCollector } = require("ethanutils")

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
  const lava = this.client.manager.nodes.filter(a => a.stats.uptime !== 0).first()
    const pingEmbed = new EthanEmbed()
    .setTitle("🏓 Pong")
    .setDescription(`<:clock2:862344276028555264> \`${pingApi}ms\`\n<:internet:797178541702774834> \`${this.client.shards.get(0).latency}ms\`\n<:MongoDB:862343156854423552> \`${pingDB}ms\`\n<:lava:862345050667089950> \`${this.client.lavalinkPings.get(lava.options.identifier).ping}ms\``)
    .setFooter(`${ctx.msg.author.username}#${ctx.msg.author.discriminator}`, ctx.msg.author.dynamicAvatarURL())
    .setColor("RED")
  
    mensagemApi.edit({ content: '', embed: pingEmbed.embed})
    mensagemApi.addReaction("help:862349947814019072")
    
    const filter = (r, user) => user === ctx.msg.author
    const collector = new ReactionCollector(this.client, mensagemApi, filter, { time: 120000 })

    collector.on('collect', async (event) => {
      console.log("eu coletei")  
      if (event.id === "862349947814019072") {
            const pingHelpEmbed = new EthanEmbed()
            .setTitle(ctx.t("commands:ping.title"))
            .setDescription(ctx.t("commands:ping.help"))
            .setFooter(`${ctx.msg.author.username}#${ctx.msg.author.discriminator}`, ctx.msg.author.dynamicAvatarURL())
            .setColor("RED")
            mensagemApi.edit({content: "", embed: pingHelpEmbed.embed})
            mensagemApi.removeReaction("help:862349947814019072")
            mensagemApi.addReaction("◀️")

         }  
         if (event.name === "◀️") {
            mensagemApi.edit({content: "", embed: pingEmbed.embed})
            mensagemApi.removeReaction("◀️")
            mensagemApi.addReaction("help:862349947814019072")
         }     
        });
}}
