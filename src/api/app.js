const express = require('express');
const app = express();
const client = require("../../index")

app.get('/', (req, res) => res.send('Hi lorena'));
app.listen(process.env.PORT || 3000, () => console.log(`Danithan online possivelmente`));

app.get('/api/cmds', (req, res) => {
  let a = []
  client.commands.forEach(cmd => {
    var arr = {
      name: cmd.commandSettings.name,
      description: cmd.commandSettings.description,
      category: cmd.commandSettings.category,
      aliases: cmd.commandSettings.aliases
    }
    a.push(arr)
  })
  res.json(a)
})
app.get('/api/randomguild', async (req, res) => {
  const guild = await client.guilds.random()
  res.json({name: guild.name, icon: guild.iconURL() || "Sem icone", id: guild.id})
})