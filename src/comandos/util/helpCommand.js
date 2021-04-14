const { EthanEmbed } = require("ethanutils")
const Command  = require("../../Structures/Command")

module.exports = class helpCommand extends Command {
constructor(client) {
    super(client,  { 
        name: "help", 
        aliases: ["ajuda"],
         category: "Info",
        cooldown: 0,
        devOnly: false
    })
}
async execute(ctx) {
  
		/*const ajuda = new EthanEmbed()
			.setTitle('Ajuda')
			.setDescription(
				`Olá ${
					ctx.msg.author
				.username}, eu sou o Danithan um bot Multifuncional\n\n<:pasta:793559362093711440> ┊ Comandos:\n[Clique aqui](https://danithan.tk/comandos)\n\n<:consertando:794535838426857472> ┊ Suporte:\n[Clique aqui](https://discord.gg/N8aGnbEKrc)\n\n<:internet:797178541702774834> ┊ Website:\n[Clique aqui](https://danithan.tk/)`
			)
			.setFooter(`Obrigado por me usar ${ctx.msg.author.username}`)
			.setColor('BLUE');
	 const mens = await ctx.msg.channel.createMessage(ajuda);
*/
const help = new EthanEmbed()
.setTitle("Meus comandos")
.setDescription("Veja os meus comandos usaveis por enquanto" + "(ao todo são:" + this.client.commands.size + " comandos)")
.addField("Utilidade", "`help, botinfo, ping, calc, docs`")
  
}

}
