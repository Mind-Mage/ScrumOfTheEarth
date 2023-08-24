const express = require('express')
const session = require('express-session')
const {daluser} = require('./dal/DALUser')
const {dalcharacter} = require('./dal/DALCharacter')
const cookieParser = require('cookie-parser')
const bcrypt = require('bcrypt')
const fs = require("fs")
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
    let characterList = await dalcharacter.returnAll()
    //console.log(characterList)//takes all the characters from the database and puts it into characterList.
    // characterList.forEach(element => {
    //     fs.writeFileSync("picture"+element.characterName,element.picture)
    // }); This was for taking Buffer images from the Database, but it didn't work
    let model = {
        user: req.session.username,
        characterList: characterList
    }
    res.render('home', model)
})

app.get('/login', (req,res) =>{
    let model = {
        user: req.session.username
    }
    res.render('login', model)
})
app.post('/login', async (req,res) =>{
    const username = req.body.username
    const password = req.body.password
    let existingUser = await daluser.findUser(username)
    let passwordMatch = false
    if(existingUser){
        passwordMatch = await bcrypt.compare(password, existingUser.password)
    }
    if(existingUser && passwordMatch){
        req.session.username = username
        res.redirect('/')
    }else{
        let model ={
            user: req.session.username,
            error:'Missing or Invalid information entered, please try again.'
        }
        res.render('login', model)
    }
})
app.get('/register', (req,res) =>{
    res.render('register')
})
app.post('/register', async (req,res) =>{
    let username = req.body.username
    let password = req.body.password
    let encryptedPassword = await bcrypt.hash(password, 10)
    if(password.length <= 8){
        let model = {
            error: "Password must be 8 characters or more"
        }
        res.render('register', model)
    }
    if(username.includes(" ")){
        let model = {
            error: "Name cannot include spaces"
        }
        res.render('register', model)
    }
    let confirmation = await daluser.register(username, encryptedPassword)
    if(!confirmation){
        let model = {
            error: "Username has been taken"
        }
        res.render('register', model)
    }else{
        res.redirect('/login')
    }
})
app.get('/character', (req,res) =>{
    let model = {
        user: req.session.username
    }
    res.render('createChar',model)
})

app.get('/createChar', (req,res) =>{
    let model = {
        user: req.session.username
    }
    res.render('createChar', model)
})

app.post('/generateCharacter', async (req, res) =>{
    console.log("Your Character was added!");
    let characterName = req.body.characterName
    let characterSkill = req.body.specialSkill
    let characterGame = req.body.gameName
    let characterPicture = req.body.pictureUpload
    if(characterName.length <= 0 && characterSkill.length <= 0 && characterGame.length <= 0 && characterPicture <= 0){
        let model ={
            error: "Fields must have something"
        }
        res.render('createChar', model)
    }
    //const base64 = fs.readFileSync(characterPicture, "base64")
    //const buffer = Buffer.from(base64, "base64") this would work if we had access to the files path but browsers don't allow this so we just get a string of characters and .jpg at the end
    let confirmation = await dalcharacter.add(characterName, characterSkill, characterGame, characterPicture)
    if(!confirmation){
        let model ={
            error: "A problem occured while creating character. The character you might be trying to make might already be in the Database"
        }
        res.render('createChar', model)
    }else{
        console.log(characterName + " was added")
        res.redirect('/')
    }
})
app.get('/logout', (req,res) =>{
    req.session.destroy()
    res.redirect('/login')
})

app.listen(port, () => {
    console.log("Listening: " + port)
})