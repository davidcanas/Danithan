const { EthanEmbed } = require("ethanutils")
const Command = require("../../Structures/Command")
module.exports = class lavalinkCommand extends Command {
    constructor(client) {
        super(client, {
            name: "lavalink",
            aliases: ["lv"],
            category: "Info",
            cooldown: 0,
            devOnly: false
        })
    }
    async execute(ctx) {
        try {
            let lava = this.client.manager.nodes.first()
            let lavabed = new EthanEmbed()
                .setTitle(ctx.t("commands:lavalink.title"))
                .addField(':palm_tree: Node', `${lava.options.identifier}`)
                .addField(":ping_pong: Ping", `${this.client.lavalinkPings.get(this.client.manager.nodes.first().identifier).ping}ms`)
                .addField(':cd: Players', `\`${lava.stats.players}\``)
                .addField(':clock1: Uptime', `\`${ctx.MsToDate(lava.stats.uptime).dias}D:${ctx.MsToDate(lava.stats.uptime).horas}H:${ctx.MsToDate(lava.stats.uptime).minutos}M:${ctx.MsToDate(lava.stats.uptime).segundos}S\``)
                .setColor("ORANGE")
                .setFooter("I lava you")

            ctx.msg.channel.createMessage(lavabed);
        } catch (LavalinkError) {
            ctx.msg.channel.createMessage("Error " + LavalinkError)
        }

    }
}