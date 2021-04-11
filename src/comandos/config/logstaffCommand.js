const { EthanEmbed } = require("ethanutils")

const Command = require("../../Structures/Command")
module.exports = class logstaffCommand extends Command {
constructor(client) {
    super(client,  { 
        name: "logstaff", 
        aliases: ["stafflog"],
         category: "Config",
        cooldown: 0,
        devOnly: false
    })
}
async execute(ctx) {
  try {
    var infu = ('https://extremoz.rn.gov.br/wp-content/uploads/2019/10/info.png')
   let canalo = args[0]
  
   let erro = new EthanEmbed()
.setDescription(`**Uso** \`e/stafflog [id do canal] \``, true)
 .setColor("RED")       

    if (!message.member.hasPermission('MANAGE_GUILD')) return message.channel.send(`**${message.author.username}** você necessita da permissão de \`MANAGE_GUILD\`.`)
    if (!canalo) return message.channel.send(erro)
    if (isNaN(canalo)) return message.channel.send(erro)
    
    
 
    message.channel.send(`✅ Canal de punições setado com sucesso.`)
} catch (e) {
  console.error(e)
  message.channel.send(e)
}
    
    
  }
  
  
}