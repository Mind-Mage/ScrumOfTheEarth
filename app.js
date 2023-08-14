const express = require('express')
const session = require('express-session')
const {daluser} = require('./dal/DALUser')
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

app.get('/', async (req,res) =>{
    let model = {
        user: false //change this later with sessions, cookies, and stuff
    }
    let guy = await daluser.register("Rodrick", 123123)
    res.render('home', model)
})

app.get('/login', (req,res) =>{
    let model = {
        user: false //change this later with sessions, cookies, and stuff
    }
    res.render('login', model)
})
app.post('/login', (req,res) =>{
    let model = {
        user: true
    }
    res.render('login', model)//start of post for login
})
app.get('/register', (req,res) =>{
    let model = {
        user: false //change this later with sessions, cookies, and stuff
    }
    res.render('register',model)
})
app.post('/register',(req,res) =>{
    let creation = false
    if(!creation){
        let model = {
            error: "Username has been taken(not actually, this hasn't been implemented yet)"
        }
        res.render('register', model)
    }else{
        res.redirect('/login')
    }
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
    res.redirect('/');
    console.log("Your Character was added!");
    // add an if statement later so that if the character is already in the database it redirects
    // them to the createChar page to add another character
})
app.get('/logout', (req,res) =>{
    req.session.destroy()
    res.redirect('/login')
})

app.listen(port, () => {
    console.log("Listening: " + port)
})