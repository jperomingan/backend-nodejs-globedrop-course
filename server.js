const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const port = 3000;
const { db } = require('./db/index')
const organization = require('./routes/organization.route')
const user = require('./routes/user.route')

app.get('/', (req, res) => {
    res.send('Hello Jenn');
});

db();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({}));
app.use(organization);
app.use(user)

app.listen(port, () => {
    console.log('Server runs at port: ', port);
});

