const Event = require("../Structures/Event");
const CommandContext = require("../Structures/CommandContext");

module.exports = class messageUpdate extends Event {
    constructor(client) {
        super(client, {
            name: 'messageUpdate'
        })
    }

    async run(msg, oldMessage) {
   if (!msg) return
   if (!msg.channel.permissionsOf(this.client.user.id).has('sendMessages')) return;
  if (msg.author.bot) return
  if (msg.content === oldMessage.content) return
  if (msg.author.bot) return
  
   this.client.emit('messageCreate', msg);
    }}