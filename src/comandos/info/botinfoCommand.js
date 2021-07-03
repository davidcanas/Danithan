//botinfo pt 1 
const { EthanEmbed } = require("ethanutils")

const Command  = require("../../Structures/Command")
const cpu1 = require('node-os-utils');
module.exports = class botinfoCommand extends Command {
constructor(client) {
    super(client,  { 
        name: "botinfo", 
        aliases: ["infobot"],
         category: "Info",
        cooldown: 0,
        devOnly: false
    })
}
async execute(ctx) {
  const cpuValor = await cpu1.cpu.usage();
   let cmd = this.client.commands.size
   let serv = this.client.guilds.size
  let nome = `${this.client.user.username}#${this.client.user.discriminator}`

 const cmdCount = await this.client.database.bot.findOne({ botID: this.client.user.id });
        
 const botinfo = new EthanEmbed()
  .setTitle("🤖 Informações do bot")
  .setDescription(`Comandos usados: ${cmdCount.commands}`)
  .addField(`😁 Nome:`, `${nome}`)
 .addField("🤖 Dono:", "`CanasDev#7766`")
  .addField(`💯 Servidores:`, `${serv}`)
  .addField("Versão do node:", `${process.version}`)
  .addField("📙 Biblioteca", "**Eris**")
    .addField(`♦️ Comandos:`, `${cmd}`)
 .addField("📅 Criado em:", "**24  de dezembro 2020**")
  .addField('__⚙️CPU__:', `**${cpuValor}%**`)
.addField('__🗜️Ram__:', `**${(process.memoryUsage().rss / 1024 / 1024).toFixed(2)}MB**`)
 .setColor("BLUE")
 .setFooter(`Danithan`, this.client.user.dynamicAvatarURL())
 .setThumbnail(this.client.user.dynamicAvatarURL())
 ctx.msg.channel.createMessage(botinfo)
}
}
