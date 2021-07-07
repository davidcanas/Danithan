const { EthanEmbed } = require("ethanutils")
const Command = require("../../Structures/Command")

module.exports = class playCommand extends Command {
  constructor(client) {
    super(client, {
      name: "queue",
      description: "Vê a lista de músicas",
      aliases: ["tocar"],
      cooldown: 0,
      category: "Music",
      devOnly: false
    })
  }
  async execute(ctx) {

 
  }}