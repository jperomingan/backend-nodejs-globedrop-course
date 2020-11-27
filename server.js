const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 3000;
const { db } = require('./db/index');
const organization = require('./routes/organization.route');
const user = require('./routes/user.route');
const { get } = require('mongoose');
const passport = require('passport');

app.get('/', (req, res) => {
    res.send('Hello Jenn');
});

app.get('/fail', (req, res) => {
    res.send('Authentication failed');
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({}));
app.use(passport.initialize());
app.use(passport.session());

db();
app.use(user);
app.use(organization);

app.listen(port, () => {
    console.log('Server runs at port: ', port);
});

