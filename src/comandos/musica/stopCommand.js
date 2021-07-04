const { EthanEmbed } = require("ethanutils")
const Command = require("../../Structures/Command")

module.exports = class stopCommand extends Command {
  constructor(client) {
    super(client, {
      name: "stop",
      description: "Para uma música",
      aliases: ["parar"],
      cooldown: 0,
      category: "Music",
      devOnly: false
    })
  }
  async execute(ctx) {

    let player = this.client.manager.players.get(ctx.msg.channel.guild.id);

    if (!player) return ctx.msg.channel.createMessage('Não posso parar nada pois não estou a tocar nada');

    const vc = ctx.msg.member.voiceState.channelID;
    if (!vc) return ctx.msg.channel.createMessage("Não estás em um canal de voz")
    
    player.destroy();
    ctx.msg.channel.createMessage("Música parada") 
  }}