const { EthanEmbed } = require("ethanutils")    
const Command  = require("../../Structures/Command")

module.exports = class tugafmCommand extends Command {
constructor(client) {
    super(client,  { 
        name: "tugafm", 
        aliases: ["tugaradio"],
        cooldown: 0,
         category: "Owner",
        devOnly: true
    })
}
async execute(ctx) {
  
if (!ctx.msg.member.voiceState.channelID) return ctx.msg.channel.createMessage("Entra num canal de voz primeiro!")

let radio;
if (!ctx.args[0]) return ctx.msg.channel.createMessage("Oops.... Falta de argumentos!")
if(ctx.args[0] === "comercial") radio = "http://195.23.102.207/comercial"
if(ctx.args[0] === "cidadefm") radio = "http://195.23.102.207/cidadefm"

            const tuga = await this.client.joinVoiceChannel(ctx.msg.member.voiceState.channelID)
            tuga.play(radio)

}  
  }