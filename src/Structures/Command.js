module.exports = class Command {
    constructor(client, options) {
        this.client = client;
        this.commandSettings = {
            name: options.name,
            category: options.category || "Desconhecido",
            description: options.description || "Sem descrição",
            aliases: options.aliases || [],
            cooldown: options.cooldown || 3,
            devOnly: options.devOnly || false,
            userperms: options.userperms || [],
            botperms: options.botperms || [],
        };
    };
};