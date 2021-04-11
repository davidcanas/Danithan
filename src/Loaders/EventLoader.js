const { readdirSync } = require("fs");

module.exports = class EventLoader {
    constructor(client) {
        const dir = "./src/eventos";

        const files = readdirSync(dir);
        if (!files) throw new Error(`EventLoader Error: No such file on directory '${dir}'`);
        const forEachFile = (filename) => {
            const Listener = require("../eventos/" + filename);
            delete require.cache[require.resolve("../eventos/" + filename)];

            const listener = new Listener(client);

            client.on(listener.name, (...args) => {
                listener.run(...args);
            });
        };

        files.forEach(forEachFile);
    }
}