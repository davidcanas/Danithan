const Command = require("../../Structures/Command")
const { exec } = require('child_process');
const { inspect } = require('util');

module.exports = class shellCommand extends Command {
constructor(client) {
    super(client,  { 
        name: "shell", 
        aliases: ["sh"],
         category: "Owner",
        cooldown: 0,
        devOnly: true
    })
}
async execute(ctx) {
  if (ctx.msg.author.id !== '791347446298312724' && ctx.msg.author.id !== '852650555254767676') {
    return ctx.msg.channel.createMessage('Apenas meu criador');
}
  let code = ctx.args.join(" ")
  exec(code, (error, stdout) => {
          try {
            const outputType = error || stdout;
            let output = outputType;
            try {
                
            } catch (err) {
                return ctx.msg.channel.createMessage(`\`\`\`shell\n${err.stack}\`\`\``)
            }
            output = output.length > 1980 ? output.substr(0, 1977) + '...' : output;
            return ctx.msg.channel.createMessage('```js\n' + output + '\n```');
          } catch (err) {
            ctx.msg.channel.createMessage("Erro: " + err)
          }
        });
    }
  
}
