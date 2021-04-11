const { readdirSync } = require('fs')

module.exports = class CommandsLoader {
    constructor(client) {
        const categoriesPath = "./src/comandos";

        const categories = readdirSync(categoriesPath);
        if (!categories) throw new Error(`CommandLoader Error: No such file on '${categoriesPath}'`);

        const forEachCategory = (category) => {

            const forEachCommand = (commando) => {
                const Command = require(`../comandos/${category}/${commando}`);

                delete require.cache[require.resolve(`../comandos/${category}/${commando}`)];

                const newcommand = new Command(client);
                client.commands.set(newcommand.commandSettings.name, newcommand);

                newcommand.commandSettings.aliases.forEach(alias => client.aliases.set(alias, newcommand.commandSettings.name));
            }

            const commandsPath = `./src/comandos/${category}`;

            const commands = readdirSync(commandsPath);
            if (!commands) return console.log(`CommandLoader Warn: Category '${category}' is empty`);

            commands.forEach(forEachCommand);
        }

        categories.forEach(forEachCategory);
    }
}