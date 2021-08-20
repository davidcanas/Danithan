const csv = require('csv-parser');
const fs = require('fs');
const { EthanEmbed } = require('ethanutils');
const Command = require("../../Structures/Command")
module.exports = class antiSelfBotCommand extends Command {
constructor(client) {
    super(client,  { 
        name: "antiselfbot", 
        aliases: ["noselfbots", "goawayselfbots", "banselfbot", "bsf"],
         category: "Admin",
         description: {
             pt: "Bane todos os selfbots *conhecidos* do seu servidor",
             en: "Ban all *known* selfbots from your server"
         },
        cooldown: 0,
        devOnly: false
    })
}
async execute(ctx) {
  if (!ctx.msg.channel.permissionsOf(ctx.msg.author.id).has('banMembers')) return ctx.msg.channel.createMessage(ctx.t("commands:antiselfbot.permuser"));
  if (!ctx.msg.channel.permissionsOf(this.client.user.id).has('banMembers')) return ctx.msg.channel.createMessage(ctx.t("commands:antiselfbot.permbot")); 
 const msg = await ctx.msg.channel.createMessage(ctx.t("commands:antiselfbot.banning"))
  fs.createReadStream('selfbots.csv')
    .pipe(csv())
    .on('data', (row) => {
     ctx.msg.channel.guild.members.get(row.user)?.ban(7, "Ban know selfbots")
    })
    .on('end', () => {
    msg.edit(ctx.t("commands:antiselfbot.sucess"))
  });
  //https://github.com/LorittaBot/FloppaPowerData
}}