const router = require("express").Router()
const Eris = require("eris")
const { EthanEmbed } = require("ethanutils")
//const firebase = require("firebase") 
//const firedb = firebase.database()

const client = require('../../../index')
//const webhookClient = new Discord.WebhookClient("812610549534949397", "fo8gbqouwnbdz222A6HF_JXYQyOeVqoL6CHZKhnUfj5bGiTOB7M5O95XCG-ss8bJeG_R");
router.get('/', async (req, res) => {
  if (req.user.id !== "791347446298312724" && req.user.id !== "718078381199065150") return res.redirect("/") 

   //const fireball = require("firebase")
  // const db = fireball.database()
   
    res.render('sugerir1.ejs', {
    //     guilds: req.user.guilds.filter(u => (u.permissions & 2146958591) === 2146958591
    // ),
      //guilds: (req.user.guilds || []).filter(
     // u => (u.permissions & 2146958591) === 2146958591
   //),
        user: req.user,
        bot: client
        
    })
})
router.post('/post/denunciar', async (req, res) => {
 const fdbed = new EthanEmbed()
.setTitle("Nova denúncia")
.setDescription(`${req.user.username}#${req.user.discriminator} fez uma denúncia a ${req.body.userdc2}`)

.setFooter("Ethan - Segurança")

   client.executeWebhook("812610549534949397", "fo8gbqouwnbdz222A6HF_JXYQyOeVqoL6CHZKhnUfj5bGiTOB7M5O95XCG-ss8bJeG_R", { 
     embeds: [fdbed.embed]
     
   })
   res.redirect("https://danithan.tk/sucesspost")
    })


module.exports = router