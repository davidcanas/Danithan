const { EthanEmbed } = require("ethanutils")
const Command  = require("../../Structures/Command")

module.exports = class helpCommand extends Command {
constructor(client) {
    super(client,  { 
        name: "help", 
        aliases: ["ajuda", "ayuda"],
        description: "Mostra os meus comandos",
         category: "Info",
        cooldown: 0,
        devOnly: false
    })
}
async execute(ctx) {
  let utilCommand = this.client.commands.filter(a => a.commandSettings.category === "Util").map(a => a.commandSettings.name).join(",")
  let infoCommand = this.client.commands.filter(a => a.commandSettings.category === "Info").map(a => a.commandSettings.name).join(",")
  let musicCommand = this.client.commands.filter(a => a.commandSettings.category === "Music").map(a => a.commandSettings.name).join(",") 
  const help = new EthanEmbed()
.setTitle("<:danithan:826727176845787136> Comandos do Danithan")
.setDescription("Veja os meus comandos [")
.addField("Utilidade", `\`${utilCommand}\``)
.addField("Informações", `\`${infoCommand}\``)
.addField("Música", `\`${musicCommand}\``)
.setFooter(ctx.msg.author.username + "#" + ctx.msg.author.discriminator, ctx.msg.author.dynamicAvatarURL())
.setTimestamp()
.setColor("GREEN")
ctx.msg.channel.createMessage(help)  
}

}