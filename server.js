// import express
const express = require('express');

/* create the instance of express object we can do that by creating the a variable called app 
and assigning that to the express instance.
*/
const app = express();
const port = 3000;

app.get('/', (req, res) =>  {
    res.send('Hello Jennelyn')
})

app.listen(port, () => {
    console.log('Server running at: ', port);
});

