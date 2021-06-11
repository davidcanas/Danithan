const { EthanEmbed } = require('ethanutils');
const Event = require("../Structures/Event");

module.exports = class guildDelete extends Event {
    constructor(client) {
        super(client, {
            name: 'guildDelete'
        });
    };

    async run(message) {
        await this.client.database.guild.findOneAndDelete({ guildID: guild.id });  
        const embed = new EthanEmbed()
            .setTitle('Fui expulso de um servidor')
            .setColor('RANDOM')
            .addField('Nome', `\`${guild.name}\``, true)
            .addField('Dono', `\`${guild.owner.user.username}#${guild.owner.user.discriminator}\``, true)
            .addField('ID do servidor', `\`${guild.id}\``, true )
            .addField('Membros', `\`${guild.members.size}\``, true)
            .setThumbnail(guild.iconURL({ format: 'png', dynamic: true }))
            .setTimestamp()

        client.guilds.get("792018456786370590").channels.get('792018815646302228').createMessage(embed);
    };
};