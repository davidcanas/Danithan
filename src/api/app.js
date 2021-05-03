const express = require('express');
const app = express();
const client = require("../../index")

app.get('/', (req, res) => res.send('Hi lorena'));
app.listen(process.env.PORT || 3000, () => console.log(`Danithan on na porta ${port}!`));

app.get('/api', (req, res) => {
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
