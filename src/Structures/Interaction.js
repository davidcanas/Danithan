const { TextChannel, User, Member } = require("eris")
const DaniError = require("./DaniError")
module.exports = class Interaction {
    constructor(client, interaction) {
      this.client = client
      this.guildID = interaction.guild_id

      const channel = this.client.getChannel(interaction.channel_id)
      const user = this.client.users.get(interaction.member.user.id)
      if (!channel || channel.type !== 0) throw new DaniError("Channel isn´t a TextChannel") 
        }}