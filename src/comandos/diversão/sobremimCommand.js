const Discord = require("discord.js");
const ms = require("parse-ms");
//const firebase = require('firebase')
//const database = firebase.database(){
const Command  = require("../../Structures/Command")

module.exports = class sobremimCommand extends Command {
constructor(client) {
    super(client,  { 
        name: "sobremim", 
        aliases: ["aboutme"],
         category: "Fun",
        cooldown: 0,
        devOnly: false
    })
}
async execute(ctx) {
  
let timeout = 1200000
message.channel.createMessage("Em manutenção.....")
   // let db = await database.ref(`Sistemas/Perfil/User:${message.author.id}`).once('value')
   // let db1ref = database.ref(`Sistemas/Economia/Delay/Daily/User:${message.author.id}`);
   // let db2ref = database.ref(`Sistemas/Perfil/User:${message.author.id}`);
    //database.ref(`Sistemas/Economia/Delay/Daily/User:${message.author.id}`)
    //.once('value').then(async (db) => {
      //  if (db.val() == null) {
        // db1ref.set({
                delay: 0
           // })
          //  database.ref(`Sistemas/Perfil/User:${message.author.id}`)
            //.once('value').then(async (db) => {
              //  if (db.val() == null) {
                //    db2ref.set({
                 //       real: 0,
                    //    btc: 0,
                     //   badges: '⭐',
                     //   sobremim: 'Sem descrição (e/sobremim)'
                    //})
              //  }
         //   })

   //let info = new Discord.MessageEmbed()
       // .setColor("CYAN")
      //  .setDescription("Registrei-o(a) no banco de dados, repita o comando!")

         //   message.channel.send(info)
       // } else {


          //  let texto = args.join(" ")
         //  if (!texto) return message.channel.send("Insira uma descrição!")
            
            
               //  database.ref(`Sistemas/Perfil/User:${message.author.id}`)
          // .once('value').then(async (db) => {
               // db2ref.update({
              //      sobremim: texto
              //  })
           // })

           // let embed = new Discord.MessageEmbed()
          //  .setColor("GREEN")
           // .setAuthor(message.author.username, message.author.avatarURL())
            //.setDescription(`O sobremim do seu perfil foi alterado para: \n \`${texto}\``)

          //  message.channel.send(embed)
       // }
    //})
 }
}