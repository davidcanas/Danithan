const router = require("express").Router()
const passport = require("passport")

router.get('/discord', passport.authenticate('discord'));

router.get("/discord/redirect", passport.authenticate('discord'), (req, res) => {
    res.redirect('https://danithan.tk/')
})
module.exports = router