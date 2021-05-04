
const Command  = require("../../Structures/Command")
const fetch = require("node-fetch")
module.exports = class docsCommand extends Command {
constructor(client) {
    super(client,  { 
        name: "docs", 
        aliases: ["erisdocs"],
        description: "See the eris documentation",
         category: "Util",
        cooldown: 0,
        devOnly: false
    })
}
async execute(ctx) {
 if (!ctx.args[0]) return ctx.msg.channel.createMessage("Uso: d/docs <Parâmetro>")
 let abacaxi = await fetch(`https://erisdocsapi2.herokuapp.com/docs?token=${process.env.ERIS_DOCS}&search=${encodeURIComponent(ctx.args.join(" "))}`).then(batata => batata.json()) 
 if (abacaxi.error) return ctx.msg.channel.createMessage("Não encontrei nada")
 ctx.msg.channel.createMessage({embed: abacaxi})
}}
  
