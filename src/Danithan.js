const { Client, Collection } = require('eris');
const DanithanDatabase = require('./Database/DanithanDatabase');
const Loaders = require('./Loaders');
//teste
module.exports = class DaniClient extends Client {
    constructor(token, options = {}, settings) {
        super(token, options);
        
        this.settings = {
            mongo: process.env.MONGOURI,
            owners: ["791347446298312724", "852650555254767676"]
        };

        this.database = new DanithanDatabase(this.settings.mongo);
        this.commands = new Collection();
        this.aliases = new Collection();
        this.cooldowns = new Collection();
        this.botInvite = "https://discord.com/oauth2/authorize?client_id=793063574834118696&scope=bot&permissions=805315640";
    };

    startLoaders() {
        for(const Loader of Object.values(Loaders)) {
            new Loader(this);
        }
        console.log(`Todos os comandos e eventos foram carregados `)
    };
};
