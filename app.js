const express = require('express')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const bcrypt = require('bcrypt')
const port = 3000
app = express()
app.set("view engine", "pug")
//app.set("view engine", "ejs")
app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
let sessionConfig = {secret:'gamer',cookie:{}}
app.use(session(sessionConfig))
app.use(cookieParser())

app.get('/', (req,res) =>{
    res.render('home')
})

app.get('/login', (req,res) =>{
    res.render('login')
})
app.get('/register', (req,res) =>{
    res.render('register')
})
app.get('/character', (req,res) =>{
    res.render('createChar')
})

app.listen(port, () => {
    console.log("Listening: " + port)
})