const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname)); // serve HTML, CSS, images
app.use(session({ secret: 'tajniKljuc', resave: false, saveUninitialized: true }));

const USERS_FILE = path.join(__dirname, 'users.json');

// ------------------ Registracija ------------------
app.post('/register', (req, res) => {
    const { username, password } = req.body;
    let users = JSON.parse(fs.readFileSync(USERS_FILE, 'utf8'));

    if(users.find(u => u.username === username)){
        return res.send('Uporabnik že obstaja!');
    }

    users.push({ username, password });
    fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
    res.redirect('/login.html');
});

// ------------------ Prijava ------------------
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const users = JSON.parse(fs.readFileSync(USERS_FILE, 'utf8'));
    const user = users.find(u => u.username === username && u.password === password);

    if(user){
        req.session.user = username;
        res.redirect('/Dom.html');
    } else {
        res.send('Napačno uporabniško ime ali geslo.');
    }
});

// ------------------ Odjava ------------------
app.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/login.html');
});

// ------------------ Trenutni uporabnik (za front-end) ------------------
app.get('/current-user', (req, res) => {
    if(req.session.user){
        res.json({ user: req.session.user });
    } else {
        res.json({ user: null });
    }
});


app.listen(PORT, () => {
    console.log(`Server teče na http://localhost:${PORT}`);
});
