const { EthanEmbed } = require('ethanutils');
const Command = require("../../Structures/Command")
module.exports = class cleanCommand extends Command {
constructor(client) {
    super(client,  { 
        name: "clean", 
        aliases: ["limpar"],
         category: "Admin",
        cooldown: 0,
        devOnly: false
    })
}
async execute(ctx) {

   ctx.msg.delete()
          if (!ctx.msg.channel.permissionsOf(ctx.msg.author.id).has('manageMessages')) {
        ctx.msg.channel.createMessage('Você necessita da permissão `MANAGE_MESSAGES`');
            return;
        }

       if (!ctx.msg.channel.permissionsOf(this.client.user.id).has('manageMessages')) {
           ctx.msg.channel.createMessage('Não tenho a permissão `MANAGE_MESSAGES`');
          return;
        }
        if (!ctx.args.length)
            return ctx.msg.channel.createMessage(`**Uso:** d/clean [N° de 2 a 200B]`);
        
        const number = ctx.args[0];
        if (isNaN(number)) 
            return ctx.msg.channel.createMessage('Insira um número');
        if (ctx.args[0] < 2 || ctx.args[0] >= 300) 
            return ctx.msg.channel.createMessage('Só consigo limpar entre 2 a 200 de  mensagens ');
        
        const embed = new EthanEmbed()
            .setColor('RANDOM')
            .setTitle('Clean')
            .setTimestamp()
            .setFooter(ctx.msg.author.username, ctx.msg.author.dynamicAvatarURL());

      ctx.msg.channel.purge(parseInt(ctx.args[0])+1).then(async msgs => {
            if (parseInt(ctx.args[0])+1 !== msgs) {
                embed.setDescription(`\`${msgs}\` mensagens foram aniquiladas\n\n😔 Não consegui apagar mais do que isto devido ao discord`);
           } else {
                embed.setDescription(` \`${msgs}\` mensagens foram aniquiladas`);
            const msg = await ctx.msg.channel.createMessage(embed);  
           }
           
        });
    }}
