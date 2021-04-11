const router = require("express").Router()


const client = require('../../../index')

router.get('/', async (req, res) => {
  // const fireball = require("firebase")
   //const db = fireball.database()
  // 
  /* const fireperfil = await db.ref(`Sistemas/Perfil/User:${req.user.id}`).once('value')
   */
    res.render('me.ejs', {
    //     guilds: req.user.guilds.filter(u => (u.permissions & 2146958591) === 2146958591
    // ),
      guilds: (req.user.guilds || []).filter(
      u => (u.permissions & 2146958591) === 2146958591
    ),
        user: req.user,
        bot: client
        //sobremim: fireperfil.val().sobremim,
        //badges: fireperfil.val().badges,
        //img: fireperfil.val().img
      
    })
})

module.exports = router