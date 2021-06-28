const { EthanEmbed } = require("ethanutils")
const Command = require("../../Structures/Command")

module.exports = class tugafmCommand extends Command {
    constructor(client) {
        super(client, {
            name: "tugafm",
            aliases: ["play"],
            cooldown: 0,
            category: "Owner",
            devOnly: false
        })
    }
    async execute(ctx) {
           console.log("executei")
           if (!ctx.msg.member.voiceState.channelID) return ctx.msg.channel.createMessage("Entra num canal de voz");
           if (!ctx.args.length) return ctx.msg.channel.createMessage("Diz algo.");
       
           const search = ctx.args.join(" ");
           let res;
       
           try {
             // Search for tracks using a query or url, using a query searches youtube automatically and the track requester object
             res = await this.client.manager.search(search, ctx.msg.author);
             // Check the load type as this command is not that advanced for basics
             if (res.loadType === "LOAD_FAILED") throw res.exception;
  
           } catch (err) {
             return ctx.msg.channel.createMessage(`Erro: ${err.message}`);
           }
       
           // Create the player 
           const player = this.client.manager.create({
             guild: ctx.msg.channel.guild.id,
             voiceChannel: ctx.msg.member.voiceState.channelID,
             textChannel: ctx.msg.channel.id,
           });
           if (res.loadType === 'PLAYLIST_LOADED') {
            const playlist = res.playlist;
  
            for (const track of res.tracks)
              player.queue.add(track);
  
            if (!player.playing)
              player.play();
  
            const embed = new EthanEmbed()
              .setColor('RANDOM')
              .setTitle('💿 A Carregar Playlist...')
              .addField("🎵 Nome da Playlist:", '`' + playlist?.name + '`')
              .addField("👤 Pedida por:", ctx.msg.author.username + "#" + ctx.msg.author.discriminator)
              //  .addField(':watch: Duração', `\`${this.client.utils.msToHour(res.playlist?.duration || 0)}\``)
            
              .setFooter("💻 | Sistema de música Danithan");
  
            const urlRegex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/
  
            urlRegex.test(ctx.args[0]) && embed.setURL(ctx.args[0]);
  
            ctx.msg.channel.createMessage(embed);
          } else {
           // Entra no canal de voz e adiciona a musica pedida a lista 
           player.connect();
           player.queue.add(res.tracks[0]);
         
           // Checks if the client should play the track if it's the first one added
           if (!player.playing) player.play()
          }     
           return ctx.msg.channel.createMessage(`Adicionando ${res.tracks[0].title} á lista `);
          }}
