const express = require('express');
const app = express();


const port = 9000;

app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.static('public'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.get('/', (req, res) => {
    res.send('Hello World!');
});


app.get('/charaters', (req, res) => {
    res.send('Hello World!');
});


app.get('/login', (req, res) => {
    res.send('Hello World!');
});


app.get('/register', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log("Express listening on port", port);
});