const express = require('express');
const app = express();
const client = require("../../danithan");

app.get("/", async(req, res) => {
  return res.send("Hi lorena");
});

app.get('/api/cmds', async(req, res) => {
  let commandsArray = []
  client.commands.forEach(cmd => {
    let organizedArray = {
      name: cmd.commandSettings.name,
      description: cmd.commandSettings.description,
      category: cmd.commandSettings.category,
      aliases: cmd.commandSettings.aliases
    };
    commandsArray.push(organizedArray);
  });
  res.json(commandsArray);
});

app.get('/api/randomguild', async(req, res) => {
  const guild = client.guilds.random().then(() => {
    return res.json({name: guild.name, icon: guild.iconURL() || "Sem icone", id: guild.id})
  });
});

app.listen(process.env.PORT || 3000, () => {
  return console.log(`Danithan online possivelmente`);
});