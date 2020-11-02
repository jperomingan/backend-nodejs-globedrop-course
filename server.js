const express = require('express');
const app = express();
const port = 3000;
const {db} = require('./db/index')

app.get('/', (req, res) => {
    res.send('Hello Jenn');
});

db();

app.listen(port, () => {
    console.log('Server runs at port: ', port);
});

