const Event = require("../Structures/Event");

module.exports = class ready extends Event {
    constructor(client) {
        super(client, {
            name: 'ready'
        });
    };

    async run(client) {
	    let activities = [
			`Utilize d/help para obter ajuda`,
			`Estou em ${this.client.guilds.size} servidores!`,
			` Versão 1.2 | Atualizações em breve`,
			`😃 Já Conheço ${this.client.users.size} usuários !`,
		     `🏳️‍🌈 | #OrgulhoLGBTQIA+ | #MêsDoOrgulhoLGBTQIA+ `
		],
		i = 0;
        setInterval(async () => {
		    this.client.editStatus('online', {
                name: `${activities[i++ % activities.length]}`,
                type: 0
            });
        }, 17000);
        console.log(`\x1b[36m[${new Date().toUTCString()}] Bot Online \x1b[0m`);   
    };
};
