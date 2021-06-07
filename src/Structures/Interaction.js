/*const { TextChannel, User, Member } = require("eris")
const ExecutorStupidError = require("./DaniError")
module.exports = class Interaction {
    constructor(client, interaction) {
      this.client = client
      this.guildID = interaction.guild_id

      const channel = this.client.getChannel(interaction.channel_id)
      const user = this.client.users.get(interaction.member.user.id)
      if (!channel || channel.type !== 0) throw new ExecutorStupidError("The Channel isn´t a TextChannel")
      if (!user) throw new ExecutorStupidError("This User doesn´t exists ! ")
        }}*/