const { EthanEmbed } = require("ethanutils")
const Command = require("../../Structures/Command")
const moment = require("moment")
module.exports = class blacklistCommand extends Command {
constructor(client) {
    super(client,  { 
        name: "blacklist", 
        aliases: ["bl"],
        cooldown: 0,
         category: "Owner",
        devOnly: true
    })
}
async execute(ctx) {
    let tipo = ctx.args[0]
    let user = ctx.args[1]
    let motivo = ctx.args.slice(2).join(" ")
    console.log(user)
    if (!tipo) return ctx.msg.channel.createMessage("Argumentos????")
    
   if (tipo === "add") {
   if (!motivo && !user) return ctx.msg.channel.createMessage("Precisas inserir um usuário e um motivo")
   let userDC = this.client.users.get(user) || await this.client.getRESTUser(user);

  console.log(userDC)
   this.client.database.user.findOneAndUpdate({
      userID: userDC.id,
      blacklist: true,
      motivo: motivo,
      horaBlacklist: `${moment().format("LLL")}` 
    }).then(a => a.save())
  let userTag = userDC.username + "#" + userDC.discriminator + " (" + userDC.id + ")"
  const a = new EthanEmbed()
   
   .setTitle("<:ban:826727595529469962> Usuário Banido com sucesso")
   .setDescription(`**${ctx.msg.author.username}**, desenvolvedor **oficial** do Danithan declara que **${userTag}** foi banido de usar o Danithan no dia **${moment().format("L")} ás ${moment().format("LT")}** _(horário de Lisboa)_ pelo seguinte motivo:\n\`${motivo}\``)
    .setFooter("Tribunal Constitucional do Danithan - Banimentos")
    .setColor("RED")
    ctx.msg.channel.createMessage(a)
}

}}