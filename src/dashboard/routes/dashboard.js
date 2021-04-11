const router = require("express").Router()
//const firebase = require("firebase") 
//const firedb = firebase.database()
//const guildDB = require("../../models/guildDB")
const client = require('../../../index')
router.get('/', (req, res) => {
    res.render('dashboard/dashboard.ejs', {
    //     guilds: req.user.guilds.filter(u => (u.permissions & 2146958591) === 2146958591
    // ),
      guilds: (req.user.guilds || []).filter(
      u => (u.permissions & 2146958591) === 2146958591
      ),
      /*guilds: req.user ? req.user.guilds.filter(guild => guild.owner) : [],*/
        user: req.user,
        bot: client
    })
})


router.get('/guilds/:guildId', async (req, res) => {
  
    const guild = client.guilds.get(req.params.guildId);
    if(!guild) return res.redirect(`https://discordapp.com/oauth2/authorize?client_id=${client.user.id}&scope=bot&permissions=8&guild_id=${req.params.guildId}`)
   
  /*  const prefix0 = await firedb.ref(`Servidores/Prefix/${req.params.guildID}/prefix`).once('value')
   if (!prefix0) prefix = 'e/'
   const prefix1 = prefix0.val()  */
 


   /*const cmdlog = await db.ref(`Sistemas/Execlog/Guild/${req.params.guildId}`).once('value')
    let dbentrada = await db.ref(`Sistemas/Entrada/${req.params.guildId}/canal`).once('value')
*/
 
   const chwel1 = await client.database.guild.findOne({guildID: req.params.guildId})
   const chwel3 = chwel1.welcomeChatID
  const chwel = client.guilds.get(req.params.guildId).channels.find(ch => ch.id === chwel3).name
  console.log(chwel)


    res.render('dashboard/guilds.ejs', {
         guilds: (req.user.guilds || []).filter(
      u => (u.permissions & 2146958591) === 2146958591
      ),
     /* guilds: req.user ? req.user.guilds.filter(guild => guild.owner) : [],*/
      user: req.user,
        bot: client,
        guild,
       fireprefix: prefix1,
       cmdstats: "Em manutenção",
       welch: chwel
      // dbentrada: dbentrada.val()
      
    })
    
    
})
router.post('/guilds/:guildId', async (req, res) => {
   
    })
router.post('/guilds/:guildId/post/username', async (req, res) => {
   
 client.guilds.get(req.params.guildId).members.cache.get(client.user.id).setNickname(req.body.botName)  
   res.redirect("https://danithan.tk/sucesspost")
    })

router.post('/guilds/:guildId/post/execlog', async (req, res) => {
//firedb.ref(`Sistemas/Execlog/Guild/${req.params.guildId}`).set(req.body.execlog) 
console.log("Resultou" + req.body.execlog)
  res.redirect("https://danithan.tk/sucesspost")
})
router.post('/guilds/:guildId/post/prefixo', async (req, res) => {


  res.redirect("https://www.danithan.tk/sucesspost")
})
module.exports = router