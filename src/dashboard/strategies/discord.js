const passport = require("passport")
const Strategy = require("passport-discord")
//const User = require('../../models/user')

passport.serializeUser(function (user, done) {
        done(null, user);
    });

    passport.deserializeUser(function (obj, done) {
        done(null, obj);
    });

    const scopes = ['identify', 'guilds'];

    passport.use(new Strategy({
        clientID: process.env.DASHBOARD_CLIENT_ID,
        clientSecret: process.env.DASHBOARD_CLIENT_SECRET,
        callbackURL: "https://danithan.tk/auth/discord/redirect",
        scope: scopes
    }, function (accessToken, refreshToken, profile, done) {
        process.nextTick(function () {
            return done(null, profile);
        });
    }));