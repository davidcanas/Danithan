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
if (!langargs) return ctx.msg.channel.createMessage(ctx.t("commands:setlang.args"))

 if (langargs !== "pt" && langargs !== "es" && langargs !== "en") return ctx.msg.channel.createMessage(ctx.t("commands:setlang.args"))
 if (langargs === "pt") {
   langargs = "pt"
   setada = "Português"
 }
 if (langargs === "es") {
   langargs = "es"
   setada = "Español"
 }
 if (langargs === "en") {
   langargs = "en"
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