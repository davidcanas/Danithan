const { EthanEmbed } = require("ethanutils")
const Event = require("../Structures/Event");
module.exports = class guildMemberAdd extends Event {
    constructor(client) {
        super(client, {
            name: 'guildMemberAdd'
        })
    }

    async run(member, guild) {
//let ch = await firedb.ref(`Sistemas/Entrada/${member.guildID}/canal`).once('value')

  //if (ch.val() === null) {
   // return;
  //}
  
  let msg1;
 if(!msg1) msg1 = `Olá ${member.user.tag} seja bem vindo ao ${member.guildName} ! `
 

 	let one = msg1.replace(/{guild}/g, member.guild.name);
		let two = one.replace(/{user}/g, member.user.username);
		let there = two.replace(/{@user}/g, member);
		let four = there.replace(/{guild.size}/g, member.guild.members.cache.size);
		let five = four.replace(/{user.tag}/g, member.user.tag);
		let six = five.replace(/{user.id}/g, member.user.id);
    let seven = six.replace(/{user.nick}/g, member.user.nickname);  
    let eight = seven.replace(/{guild.id}/g, member.guild.id);
msg1 = eight
 
// let channel = client.channels.cache.get(ch.val())
  //const ebed = new Discord.MessageEmbed()
  //.setTitle("Bem vindo !")
  //.setDescription(msg1)
  //.setColor("RANDOM")
  //.setFooter("Ethan | Log de entradas")
 // channel.send(ebed)
  
  
} 
}