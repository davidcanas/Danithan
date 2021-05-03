const express = require('express');
const app = express();
const port = 3000;
const client = require("../../index")

app.get('/', (req, res) => res.send('Hello World!'));
app.listen(port, () => console.log(`Example app listening on port ${port}!`));

app.get('/products', (req, res) => {
  let a = []
  client.commands.forEach(cmd =>{
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
