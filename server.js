const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send('Hello Jenn');
});

app.listen(port, () => {
    console.log('Server runs at port: ', port);
});

