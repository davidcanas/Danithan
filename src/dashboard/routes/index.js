const router = require('express').Router()
const auth = require('./auth')
const client = require('../../../index')
const dashboard = require('./dashboard')
const perfil = require('./perfil')
const admin = require('./admin')
const den = require('./den')
const rateLimit = require("express-rate-limit")
const checkAuth = require('../utils/checkAuth')
//const sugest = require('./sugerir')
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, 
  max: 120
});
function isAuthorized(req,res, next) {
  const auth = req.headers.authorization;
  if (auth === 'AdemiresDanithan' || auth === "%Kuewcj}W2fnF!vP>5cl") {
    next();
  } else {
    res.status(401);
   var jaison = {
     error: 401,
     message: "Não autorizado"
   }
    res.json(jaison);
  }
}
function MsToDate(ms){
  let seg = Math.floor(ms/1000)
  let minutes = 0
  let hours = 0
  let days = 0

  while (seg >= 60) minutes++, seg-=60
  while (minutes >= 60) hours++, minutes-=60
  while (hours >= 24) days++, hours-=24
  return {
   dias: days,
   horas: hours,
   minutos: minutes,
   segundos: seg
  }
}

router.get('/', (req, res) => {
  
    res.render('index.ejs', {
        bot: client,
        user: req.user
    })
})
router.get('/comandos', (req, res) => {
    console.log(client.commands)
    res.render('commands.ejs', {
        comandos: [ ...new Set(client.commands.filter(x => x.commandSettings.category !== 'Owner').map(x => x))],
        categorias: [ ...new Set(client.commands.filter(x => x.commandSettings.category !== 'Owner').map(x => x.commandSettings.category))],
        bot: client,
        user: req.user
    })
})
router.get('/login', (req, res) => {
    res.redirect('/auth/discord')
})
router.get('/logout', async (req, res) => {
    await req.logout()
    await res.redirect("/");
})
router.get('/invite', (req, res) => {
  res.redirect('https://discord.com/oauth2/authorize?client_id=791772649708716072&scope=bot&permissions=805316670')
})
router.use("/auth", auth)
router.use("/dashboard", checkAuth, dashboard)
router.use("/@me/perfil", checkAuth, perfil)
router.use("/admin", checkAuth, admin)
router.use("/den", checkAuth, den)




router.get('/stahehetus', (req, res) => {
    res.render('status.ejs', {

        user: req.user,
        bot: client,
        
      
    })
})
router.get('/noscript', (req, res) => {
    res.render('noscript.ejs', {

        user: req.user,
        bot: client,
        
      
    })

})
router.get('/sucesspost', (req, res) => {
    res.render('sucess.ejs', {

        user: req.user,
        bot: client,
        
      
    })


})
router.get('/features', (req, res) => {
  

    res.render('sla.ejs', {

        user: req.user,
        bot: client,
        
      
    })
})
router.get('/servidor', (req, res) => {
    res.redirect('https://discord.gg/Pb3bV4nFM5')
})
router.post('/dashboard/guilds/:guildID/save/username', async (req, res) => { // Post Prefix
        let guild = client.guilds.cache.get(req.params.guildID)
        if (!guild) {
            return res.redirect(`https://discord.com/api/oauth2/authorize?client_id="+client.config.clientid+"&permissions=8&redirect_uri=https%3A%2F%2F"+client.config.url+"%2F&scope=bot&guild_id=${req.params.guildID}`)
        }

        let dados = req.params.guildID;
     let usernome = req.body.botName
     guild.me.setNickname(usernome)
       res.redirect(`/sucesspost`)
    })
let up = MsToDate(client.uptime)

router.get("/api/v2/uptime", limiter, (req, res) => {
  
  let upa = MsToDate(client.uptime)
  res.json(upa);
});
router.get("/api/v2/status", limiter, (req, res) => {
  
 let stats = client.guilds.get("792018456786370590").members.get(client.user.id).game
res.json(stats)
});
router.get("/api/v2/randomGuild", limiter, isAuthorized, (req, res) => {
  
 let random = client.guilds.random()
 let userD = client.users.get(random.ownerID)
let dono = `${userD.username}`
res.json({name: random.name, owner: dono, icon: random.iconURL || "No Icon :/"})
});
router.get('*', (req, res) => {
    res.status(404).render('404.ejs', {
      user: req.user,
      bot: client
    })
})



module.exports = router

// guilds: client.guilds.cache.filter(g => g.members.cache.has(req.user.id)),
// user: req.user,
// bot: client