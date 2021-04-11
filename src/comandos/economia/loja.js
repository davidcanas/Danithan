
const Command  = require("../../Structures/Command")

module.exports = class superMarketCommand extends Command {
constructor(client) {
    super(client,  { 
        name: "loja", 
        aliases: ["shop"],
        cooldown: 0,
         category: "Economy",
        devOnly: false
    })
}
async execute(ctx) {
  
}}