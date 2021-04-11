const Command = require("../../Structures/Command");

module.exports = class LanguageCommand extends Command {
constructor(client) {
    super(client,  { 
        name: "setlang", 
        aliases: ["langset", "lang"],
         category: "Config",
        cooldown: 3,
    })
}

async execute(ctx) {
let setada;
let langargs = ctx.args[0]
if (!langargs) return ctx.msg.channel.createMessage("Insira uma linguagem:\n`en, es, pt`")
 if (langargs !== "pt" && langargs !== "es" && langargs !== "en") return ctx.msg.channel.createMessage("Linguagem Inválida | Lista de linguagens disponíveis:\n`pt, es, en`")
 if (langargs === "pt") {
   langargs = "pt-BR"
   setada = "Português"
 }
 if (langargs === "es") {
   langargs = "es-ES"
   setada = "Español"
 }
 if (langargs === "en") {
   langargs = "en-US"
   setada = "English"
 }
 
 this.client.database.guild.findOneAndUpdate({
   guildID: ctx.msg.channel.guild.id,
  Settings: {
   lang: `${langargs}`
  } 
 }).then(a => a.save())
ctx.msg.channel.createMessage(ctx.t("commands:setlang.sucess", { Lang: `${setada}`}))
}}