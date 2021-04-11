require('./strategies/discord')
const express = require('express')
const app = express()
const path = require("path")

const client = require('../../index')
const session = require("express-session")
// mongoose = require("mongoose")


const passport = require("passport")
const index = require('./routes/index')

app.use(session({ //Configuração do express-session
     secret: 'keyboard cat',
     cookie: {
        maxAge: 60000 * 60 * 24//tempo do cookie
    },
    resave: false,
    saveUninitialized: false,
    store: false//pra o store mongo
}))

app.use(passport.initialize())//inicializa o  passport
app.use(passport.session())//inicializa o session do passport




app.set("views", path.join(__dirname, "/views"))//diretorio de views
app.use(express.static(path.join(__dirname, "/public")))//diretorio de arquivos estaticos

app.engine("html", require("ejs").renderFile) //coloca ejs renderFile como engine
app.set("view engine", "ejs")//seta o ejs como view engine

app.use(express.json())//Pra receber respostas json
app.use(express.urlencoded({ extended: true }))

app.use('/', index) //pasta de rotas

 app.listen(process.env.PORT, () => {
  console.log('Dashboard Ligada ')
})//liga servidor