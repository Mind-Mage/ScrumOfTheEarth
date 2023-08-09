const express = require('express')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const bcrypt = require('bcrypt')
const port = 3000
app = express()
app.set("view engine", "pug")
app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
let sessionConfig = {secret:'gamer',cookie:{}}
app.use(session(sessionConfig))
app.use(cookieParser())

app.get('/', (req,res) =>{
    let model = {
        user: false //change this later with sessions, cookies, and stuff
    }
    res.render('home', model)
})

app.get('/login', (req,res) =>{
    let model = {
        user: false //change this later with sessions, cookies, and stuff
    }
    res.render('login', model)
})
app.get('/register', (req,res) =>{
    let model = {
        user: false //change this later with sessions, cookies, and stuff
    }
    res.render('register',model)
})
app.get('/character', (req,res) =>{
    let model = {
        user: false //change this later with sessions, cookies, and stuff
    }
    res.render('createChar',model)
})

app.get('/createChar', (req,res) =>{
    res.render('createChar')
})

app.post('/generateCharacter', (req, res) =>{
    res.end("Character Added!");
})

app.listen(port, () => {
    console.log("Listening: " + port)
})