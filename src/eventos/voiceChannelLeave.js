const Event = require("../Structures/Event");

module.exports = class voiceChannelLeave extends Event {
    constructor(client) {
        super(client, {
            name: 'voiceChannelLeave'
        });
    };

    async run(member, oldChannel) {
        const player = this.client.manager.players.get(member.guild.id);
        if (!player) return;
        if (!member.bot && oldChannel.id === player.voiceChannel && !oldChannel.voiceMembers.filter(m => !m.bot).length && oldChannel.id !== process.env.VOICECHANNELID) {
            player.destroy()
            const msg = await this.client.createMessage(player.textChannel, 'Triste fiquei sozinho por isso adeus até nunca!');
        }
    }}