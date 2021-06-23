const { EthanEmbed } = require("ethanutils")
const Command = require("../../Structures/Command")

module.exports = class tugafmCommand extends Command {
    constructor(client) {
        super(client, {
            name: "tugafm",
            aliases: ["tugaradio"],
            cooldown: 0,
            category: "Owner",
            devOnly: true
        })
    }
    async execute(ctx) {
if (ctx.msg.channel.type !== 0 || !ctx.msg.guild) return;
    if (!ctx.msg.channel.permissionsOf(this.client.user.id).has('embedLinks')) {
      ctx.sendMessage(':x: Preciso da permissão `Anexar Links` para executar este comando');
      return;
    }

    const currPlayer = this.client.managers.players.get(ctx.msg.guild.id);

    if (!this.client.manager.canPlay(ctx, currPlayer)) return;

    const voiceChannelID = ctx.msg.member?.voiceState.channelID
    const voiceChannel = this.client.getChannel(voiceChannelID)

    const createPlayer = function() { 
      const player = this.client.manager.create({
        guild: ctx.msg.guild?.id,
        voiceChannel: voiceChannelID,
        textChannel: ctx.msg.channel.id,
        selfDeafen: true
      });

      return player;
    }

    try {
      const res = await this.client.manager.search(ctx.args.join(' '), ctx.msg.author);

      if (res.loadType === 'LOAD_FAILED') {
        ctx.msg.channel.createMessage(':x: Falha ao carregar a música.');
      } else if (res.loadType === 'NO_MATCHES') {
        ctx.msg.channel.createMessage(':x: Nenhuma música encontrada.');
      } else {
        const player = currPlayer || createPlayer();


        if (player.state === 'DISCONNECTED') {
          if (!voiceChannel.permissionsOf(this.client.user.id).has('manageChannels') && voiceChannel.userLimit && voiceChannel.voiceMembers.size >= voiceChannel.userLimit) {
            ctx.sendMessage(':x: O canal de voz está cheio!');
            player.destroy();
            return;
          }
          player.connect();
        }

        if (res.loadType === 'PLAYLIST_LOADED') {
          const playlist = res.playlist;

          for (const track of res.tracks)
            player.queue.add(track);

          if (!player.playing)
            player.play();

          const embed = new EthanEmbed()
            .setColor('RANDOM')
            .setTitle('<a:disco:803678643661832233> Playlist Carregada')
            .addField(":page_with_curl: Nome:", '`' + playlist?.name + '`')
            .addField("<a:infinity:838759634361253929> Quantidade de músicas:", '`' + res.tracks.length + '`')
            .addField(':watch: Duração', `\`${this.client.utils.msToHour(res.playlist?.duration || 0)}\``)
            .setTimestamp()
            .setFooter(`${ctx.author.username}#${ctx.author.discriminator}`, ctx.author.dynamicAvatarURL());

          const urlRegex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/

          urlRegex.test(ctx.args[0]) && embed.setURL(ctx.args[0]);

          ctx.msg.channel.createMessage(embed);
        } else {
          const tracks = res.tracks;

          player.queue.add(tracks[0]);

          ctx.msg.channel.createMessage(`:bookmark_tabs: Adicionado à lista \`${tracks[0].title}\``);

          if (!player.playing)
            player.play();
        }
      }
    } catch (err) {
      console.error(err);
      ctx.msg.channel.createMessage(':x: Ocorreu um erro ao procurar a música.');
    }
  }

}
