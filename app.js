console.log('app.js');

const express = require('express');
const bycrypt = require('bcrypt');    
const session = require('express-session');
const cookieParser = require('cookie-parser');

const port = 1024;

app = express();  
app.set("view engine", "pug");

app.use(cookieParser());
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

let sessionConfig = {
    secret: "SecretCode",
    cookie: {},
};
app.use(session(sessionConfig));

app.get("/", (req, res) => {
    res.render("home");
});

app.get("/register", (req, res) => {
    res.render("register");
});



app.get("/login", (req, res) => {
    res.render("login");
});


app.get("/characters", (req, res) => {
    res.render("characters");
});

app.get("/logout", (req, res) => {
    req.session.destroy();
    res.redirect("/");
});


// app.post("/register", async (req, res) => {
//     const {username, password} = req.body;
//     const hash = await bycrypt.hash(password, 12);
//     console.log(hash);
//     res.send("All Ok");
// });


// app.post("/login", async (req, res) => {
//     const {username, password} = req.body;
//     const hash = await bycrypt.hash(password, 12);
//     console.log(hash);
//     res.send("All Ok");
// });



app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
});


