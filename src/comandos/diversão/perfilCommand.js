const Discord = require("discord.js");
const ms = require("parse-ms");

const Command  = require("../../Structures/Command")

module.exports = class perfilCommand extends Command {
constructor(client) {
    super(client,  { 
        name: "perfil", 
        aliases: ["profile"],
        cooldown: 0,
         category: "Fun",
        devOnly: false
    })
}
async execute(ctx) {
  
 message.channel.createMessage("Em manutenção")
 
 // let usuario = client.users.cache.get(args[0]) || client.users.cache.find(mb => mb.username == args.join(" ")) || message.mentions.users.first();
   // if (!usuario) usuario = message.author;
    //let dbref = database.ref(`Sistemas/Perfil/User:${usuario.id}`);
   

    
  //  let db = await database.ref(`Sistemas/Perfil/User:${usuario.id}`).once('value')
   // if (db.val() == null) {
      //  dbref.set({
          // sobremim: 'Sem descrição (e/sobremim)',       
         //badges: '⭐',
         // img: "https://cdn.discordapp.com/attachments/792018845946085376/803283480691212288/PicsArt_01-25-03.15.34.jpg"
      //  })
        //  let info = new Discord.MessageEmbed()
       // .setColor("YELLOW")
       /* .setDescription(`<a:carregando:803349308589867010> Registrando ${usuario.tag} no banco de dados`)
 let inf2 = new Discord.MessageEmbed()
        .setColor("GREEN")
        .setDescription("Registrei-o(a) agora repita o comando!")
const msg = await message.channel.send(info)
setTimeout(() => { 
      msg.edit(inf2)
    }, 7000)
    }    
database.ref(`Sistemas/Economia/Carteira/User:${usuario.id}`).once('value').then(async function(snap){
  
  let sobremim = [db.val().sobremim]
  //let vip = [db.val().vip]
  let bdg = [db.val().badges]
  let background = db.val().img
  const perfil = new Discord.MessageEmbed()
  .setTitle('Perfil')
  .setColor('RANDOM')
  .setDescription(`Perfil de ${usuario.tag}!

**__Nome__:** ${usuario.tag}

**__Id__:** ${usuario.id}

**__Sobre Mim__:** \`${sobremim}\`

**__Badges__**: ${bdg}`)
 perfil.setImage(background)
 message.channel.send(perfil)  
 }) */
  
    }
}