const { Client, Collection } = require('eris');
const DanithanDatabase = require('./Database/DanithanDatabase');
const Loaders = require('./Loaders')

module.exports = class Danithan extends Client {
    constructor(token, options = {}, settings) {
        super(token, options);
        
        this.settings = {
            mongo: settings.mongo,
            owners: settings.owners
        }

        this.database = new DanithanDatabase(this.settings.mongo);
        this.commands = new Collection();
        this.aliases = new Collection();
        this.cooldowns = new Collection();
    }

    startLoaders() {
        for(const Loader of Object.values(Loaders)) {
            new Loader(this);
        }
        console.log(`\x1b[36m[${new Date().toUTCString()}] Todos os comandos e eventos foram carregados \x1b[0m`)
    }
}