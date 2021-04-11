const { EthanEmbed } = require("ethanutils");
const ms = require("parse-ms");
const Command  = require("../../Structures/Command")

module.exports = class setimgCommand extends Command {
constructor(client) {
    super(client,  { 
        name: "setimg", 
        aliases: ["profileimage"],
        cooldown: 0,
       category: "Fun",
        devOnly: false
    })
}
async execute(ctx) {
  
let timeout = 1200000
     

            let texto = message.attachments[0]
            if (!texto && !args[0]) return message.channel.createMessage("Anexe/Insira link de uma imagem!")
            
           
      
       async function logchannel() {
       const imgh = args[0] || texto.url
         // let ch = client.channels.get("818475369593044993")
          const veribed = new EthanEmbed()
          .setTitle(`Imagem de ${message.author.username}#${message.author.discriminator}`)
          .setDescription("Recebemos uma imagem para verificação")
          .setAuthor(message.author.id)
          .setImage(imgh)
        const mens = await client.createMessage("818475369593044993", veribed);
        mens.addReaction("✔️")
        mens.addReaction("✖")
        }
let oi = new EthanEmbed()
.setTitle("<a:carregando:803349308589867010> Guardando Imagem")
.setDescription("Sua imagem será enviada para verificação para evitar conteudo NSFW!\nLembre-se se você tentar enviar conteudo NSFW+ você poderá ser banido do Bot e até do Discord !")
.setColor("GREY")
          let embed = new EthanEmbed()
            .setColor("GREEN")
            .setDescription(`Enviamos sua Imagem para verificação!`)
            
            const msg = await message.channel.createMessage(oi)
setTimeout(() => { 
      msg.edit(embed).then(logchannel())
    }, 9000)
    
  
        

}
}
