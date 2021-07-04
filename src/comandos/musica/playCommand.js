const { EthanEmbed } = require("ethanutils")
const Command = require("../../Structures/Command")

module.exports = class playCommand extends Command {
  constructor(client) {
    super(client, {
      name: "play",
      description: "Toca uma música",
      aliases: ["tocar"],
      cooldown: 0,
      category: "Music",
      devOnly: false
    })
  }
  async execute(ctx) {

    if (!ctx.msg.member.voiceState.channelID) return ctx.msg.channel.createMessage("Entra num canal de voz");
    if (!ctx.args.length) return ctx.msg.channel.createMessage("Diz algo para eu tocar.");

    const search = ctx.args.join(" ");
    let res;

    try {
      //  Pesquisa por Musicas 
      res = await this.client.manager.search(search, ctx.msg.author);
      // Vê se não houve nenhum erro na pesquisa
      if (res.loadType === "LOAD_FAILED") throw res.exception;

    } catch (err) {
      return ctx.msg.channel.createMessage(`Ups ocorreu um erro (reporte a um dos responsaveis pelo danithan por favor)\n\`${err.message}\``);
    }

    // Create the player 
    const player = this.client.manager.create({
      guild: ctx.msg.channel.guild.id,
      voiceChannel: ctx.msg.member.voiceState.channelID,
      textChannel: ctx.msg.channel.id,
    });
    //Aqui verificamos se é uma playlist e se é carregamos a mesma
    if (res.loadType === 'PLAYLIST_LOADED') {
      const playlist = res.playlist;

      for (let poh of res.tracks)
        player.queue.add(poh);
      /* ^ Thank you D4rkB ^ */
      
      // Verifica se o bot está tocando caso não esteja ele toca
      if (!player.playing)
        player.play();

      const embed = new EthanEmbed()
        .setColor('RANDOM')
        .setTitle('💿 A Carregar Playlist...')
        .addField("🎵 Nome da Playlist:", '`' + playlist?.name + '`')
        .addField("👤 Pedida por:", ctx.msg.author.username + "#" + ctx.msg.author.discriminator)
        .setFooter("💻 | Sistema de música Danithan");



      ctx.msg.channel.createMessage(embed);
    } else {
      // Entra no canal de voz e adiciona a musica pedida a lista 
      player.connect();
      player.queue.add(res.tracks[0]);

      // Verifica se o bot está tocando caso não esteja ele toca
      if (!player.playing) player.play()

      return ctx.msg.channel.createMessage(`Adicionando ${res.tracks[0].title} á lista `);
    }
  }
}
