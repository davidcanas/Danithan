const router = require("express").Router()
const Discord = require("discord.js")

const client = require('../../../index')
const webhookClient = new Discord.WebhookClient("812610549534949397", "fo8gbqouwnbdz222A6HF_JXYQyOeVqoL6CHZKhnUfj5bGiTOB7M5O95XCG-ss8bJeG_R");
router.get('/', async (req, res) => {
  if (req.user.id !== "791347446298312724" && req.user.id !== "718078381199065150") return res.redirect("/") 

 
    res.render('admin.ejs', {
    //     guilds: req.user.guilds.filter(u => (u.permissions & 2146958591) === 2146958591
    // ),
      guilds: (req.user.guilds || []).filter(
      u => (u.permissions & 2146958591) === 2146958591
    ),
        user: req.user,
        bot: client
        
    })
})
router.post('/post/aviso', async (req, res) => {
 const fdbed = new Discord.MessageEmbed()
.setTitle(req.body.title)
.setDescription(req.body.desc)
.setColor("RANDOM")
.setFooter("A Equipe do Ethan")

   webhookClient.send(fdbed)
   res.redirect("https://danithan.tk/sucesspost")
    })


module.exports = router