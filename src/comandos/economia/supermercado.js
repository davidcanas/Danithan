
const Command  = require("../../Structures/Command")
const { EthanEmbed } = require("ethanutils")
module.exports = class superMarketCommand extends Command {
constructor(client) {
    super(client,  { 
        name: "supermercado", 
        aliases: ["supermarket", "sm"],
        cooldown: 0,
         category: "Economy",
        devOnly: false
    })
}
async execute(ctx) {
  try {
  let argumento = ctx.args[0]
  let arg2 = ctx.args.slice(1).join(" ")
  if (!argumento) return ctx.msg.channel.createMessage("Uso: d/supermercado <criar/ver>")
  if (argumento === "criar") {
  if (!arg2) return ctx.msg.channel.createMessage("Falta de argumentos: d/supermercado criar <nome>")
if (arg2.length > 20) return ctx.msg.channel.createMessage("Insira um texto menor")
const superVerif = await this.client.database.user.findOne({userID: ctx.msg.author.id})
  if (superVerif.superMercado.nome) {
    return ctx.msg.channel.createMessage(`Você já têm um supermercado (${superVerif.superMercado.nome}) !`)
  }
  this.client.database.user.findOneAndUpdate({
    userID: ctx.msg.author.id,
    superMercado: {
      nome: arg2,
      dinheiro: 100,
      dono: ctx.msg.author.id,
      ativado: true
    },
    
   
  }).then(a => a.save())
  ctx.msg.channel.createMessage(`O supermercado ${arg2} foi criado !`)

  }
  if (argumento === "info" || argumento === "ver" || argumento === "see") {
if (!arg2) return ctx.msg.channel.createMessage("Falta de argumentos: d/supermercado ver <id/@user>")
  let iduser = this.client.users.get(arg2) || ctx.msg.mentions[0]
if (!iduser) return ctx.msg.channel.createMessage("Usuário não existente!")
   const userFind = await this.client.database.user.findOne({userID: iduser.id}).then(a => a.superMercado)

 
 if (!userFind.nome) return ctx.msg.channel.createMessage("Esse usuário não tem empresa")
 const tagUser = await ctx.findUser(userFind.dono).then(a => a.tag)
 const Embed = new EthanEmbed()
 .setTitle("🛒 " + userFind.nome)
 .setDescription(`Supermercado de ${tagUser}\n\n\n💸 Dinheiro: ${userFind.dinheiro}€`)
 .setColor("RED")
 ctx.msg.channel.createMessage(Embed)
  }
    } catch (err) {
    console.log(err)
    ctx.msg.channel.createMessage("Erro:" + err)
  }
}}