const emo = require("../utils/emojis")

const client = require("../../index.js")

const { EthanEmbed } = require('ethanutils')
const ReactionHandler = require('eris-reactions');

const i18next = require("i18next");
const Event = require("../Structures/Event");
const CommandContext = require("../Structures/CommandContext");
const { verificaSemelhanca } = require('../utils/dife.js')
const tmp = [];
module.exports = class messageCreate extends Event {
    constructor(client) {
        super(client, {
            name: 'messageCreate'
        })
    }

    async run(msg) {
  try {

 let gRes = await this.client.database.guild.findOne({ guildID: msg.guildID })

        if(!gRes) {
            await this.client.database.guild.create({
                guildID: msg.guildID,
                
                
            })
            gRes = await this.client.database.guild.findOne({ guildID: msg.guildID }) 
        }
        let uRes = await this.client.database.user.findOne({ userID: msg.author.id })

        if(!uRes) {
            await this.client.database.user.create({
                userID: msg.author.id,
                
                
            })
            uRes = await this.client.database.user.findOne({ userID: msg.author.id }) 
        }
 let language = gRes.Settings.lang
    let t = await i18next.getFixedT(language, ["commands", "events", "default"]);
       /* const startDB = process.hrtime();
        guild = await guildDB.findOne({ guildID: message.channel.guild.id });
        const stopDB = process.hrtime(startDB);
        message.guildDB = guild;
        message.pingDB = Math.round(((stopDB[0] * 1e9) + stopDB[1]) / 1e6);*/
    
  let prefix1;
  if (!prefix1) prefix1 = "d/"

 

  if (msg.content.startsWith(`<@${this.client.user.id}>`) || msg.content.startsWith(`<@!${this.client.user.id}>`)) {
    let botembed = new EthanEmbed()
      .setTitle("❓ Precisa de ajuda?")
      .setDescription(`Olá **${msg.author.username}#${msg.author.discriminator}** meu prefixo é ${prefix1} use ${prefix1}help para mais informações!`)
      .setColor("YELLOW")
      .setFooter("Reaja com ❓ para ver todos os comandos")
    const msg1 = await msg.channel.createMessage(botembed)
    msg1.addReaction("❓")
       const reactionListener = new ReactionHandler.continuousReactionStream(
            msg1, 
            (userID) => userID !== msg1.author.id && userID === msg.author.id, 
            false, 
            { maxMatches: 1, time: 900000 }
        );
    
        reactionListener.on('reacted', (event) => {
         msg.content = `${prefix1}help`
         this.client.emit("messageCreate", msg)
               });
      //msg.react("❓");
    // let filtro = (reaction, usuario) => reaction.emoji.name === "❓" && usuario.id === message.author.id;
      //let coletor = msg.createReactionCollector(filtro, { max: 1 });
      //coletor.on("collect", em => {
       // message.content = 'e/cmds';
      //  client.emit('message', message)

       // msg.delete()
      //})
    //})
 // client.createMessage(message.channel.id, )
  }
  
  
  const emoji = emo

  let prefix = null
  if (!prefix) prefix = "d/"
  if (!msg.content.startsWith(prefix)) return;
  let args = msg.content.slice(prefix.length).trim().split(/ +/g);
    
  let cmd = args.shift().toLowerCase(); //cof cof
  let command;
//let execdb = await firedb.ref(`Sistemas/Execlog/Guild/${message.guildId}`).once('value')
  //if (execdb.val() === "Sim" && cmd.includes === "everyone") {
   //  return console.log("Ameno")
  //}
  if (cmd.length === 0) return;

  if (this.client.commands.has(cmd)) {
    command = this.client.commands.get(cmd);
  } else {
    command = this.client.commands.get(this.client.aliases.get(cmd));
  }
  



  const array = this.client.commands.map(x => x.commandSettings.aliases.concat([x.commandSettings.name])).flat().filter(e => e)//pega todos os comandos(aliases tambem)

   //pega todas as embeds
  //cooldown

 // let dbverif = quick.get(`Blacklist_${message.author.id}`)
  //let dbrverif = quick.get(`BlaclistReason_${message.author.id}`)

//const dbverif = userDB.findOne({userID: message.author.id}).blacklist
 // if (dbverif) return client.DeleteEmbed("Blacklist", `Você está proibido de me usar por`)

  //Cooldown 
  /*let dbmanu = await firedb.ref("Bot/Manu").once("value")
  if (message.author.id !== "791347446298312724") {
    if (dbmanu.val()) return client.DeleteEmbed("Em manutenção", "O Ethan está em manutenção de momento")
  } */
 
  if (!command) {
  
      
     msg.channel.createMessage(`O comando executado não existe`,  + `${!verificaSemelhanca(cmd, array) ? '' : `já parou para pensar que vc queria dizer` + `\`${prefix}${verificaSemelhanca(cmd, array)}\`?`}`)
  }
  

if (command) {
 if (!msg.channel.permissionsOf(this.client.user.id).has('sendMessages')) return  this.client.users.get(msg.author.id).getDMChannel().then(a => a.createMessage("Lamento mas não tenho permissão de enviar mensagens !"))
	//if (guild && guild.disabledCmds && guild.disabledCmds.includes(command.help.name))
      //  return message.channel.createMessage(`Comando desativado !`);
let userVerif = await this.client.database.user.findOne({userID: msg.author.id})
 if (userVerif.blacklist) {
  const embeda = new EthanEmbed()
   .setTitle("<:ban:826727595529469962> Você está banido !")
   .setDescription(`${msg.author.mention}, você foi e está banido de me usar desde \`${userVerif.horaBlacklist}\` pelo motivo \`${userVerif.motivo}\`\n`)
   .setColor("RED")
   .setFooter("Adeus, até um dia !")
 return msg.channel.createMessage(embeda).then(a =>{

 
 setTimeout(() => {
a.delete()
}, 15000);
 })
  }
 // if(command.help.enabled === false) {
   // return message.channel.send("Comando desativado")
 // }
 // if(command.help.ownerOnly === true && message.author.id !== "791347446298312724") {
  //  return message.channel.createMessage("Apenas para meu dono!")
  //}
 
}
   const ctx = new CommandContext(this.client, msg, args, t, emoji)
  if (command) {
  
    command.execute(ctx); //executa o comando

 const cmdsUsed = await this.client.database.bot.findOne({ botID: this.client.user.id });
        ++cmdsUsed.commands;
        cmdsUsed.save();
    const commando = new EthanEmbed()
      .setTitle('Log de Comandos')
       .addField("Username", `${msg.author.username}#${msg.author.discriminator}`)
        .addField("ID do usuário", `${msg.author.id}`)
        .addField("Nome do Servidor:", `${msg.channel.guild.name}`)
       .addField("Id do servidor:", `${msg.channel.guild.id}`)
       .addField("Canal Utilizado", `${msg.channel.name} (${msg.channel.id})`)
        .addField("Comando utilizado:", `${msg.content}`)
       .setColor("RED")

     //const guild = client.guilds.cache.get('792018456786370590');
      //const canal = guild.channels.cache.get('792018829407420427');
      this.client.createMessage("792018829407420427", commando);


    }
  

} catch(err) {
  console.error(err)
}
}
}