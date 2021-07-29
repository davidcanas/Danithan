const Event = require("../Structures/Event");

module.exports = class ready extends Event {
    constructor(client) {
        super(client, {
            name: 'ready'
        });
    };

    async run(client) {
	    let activities0 = [
			`Utilize d/help para obter ajuda | Shard 0/1 `,
			`Estou em ${this.client.guilds.size} servidores!| Shard 0/1 `,
			` Versão 1.2 | Grande atualização em breve | Shard 0/1`,
			`😃 Já Conheço ${this.client.users.size} usuários ! | Shard 0/1`,
		     ``
		]
        let activities1 = [
			`Utilize d/help para obter ajuda | Shard 1/1`,
			`Estou em ${this.client.guilds.size} servidores! | Shard 1/1`,
			`Estou em ${this.client.guilds.size} servidores! `,
			` Versão 1.2.1 | Grande atualização em breve | Shard 1/1`,
			`😃 Já Conheço ${this.client.users.size} usuários ! | Shard 1/1`,
		     ``
		],
		i = 0;
        setInterval(async () => {
		    this.client.shards.get(0).editStatus('online', {
                name: `${activities0[i++ % activities0.length]}`,
                type: 0
            });
            this.client.shards.get(1).editStatus('online', {
                name: `${activities0[i++ % activities0.length]}`,
                type: 0
            });
        }, 15000);

        console.log(`\u001b[32m[${new Date().toUTCString()}] Bot Online \u001b[39m`);   
    };
};
