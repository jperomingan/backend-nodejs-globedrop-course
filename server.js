// import express
const express = require('express');
const bodyParser = require('body-parser');
const { db } = require('./db/index');
const passport = require('passport')

/* create the instance of express object we can do that by creating the a variable called app 
and assigning that to the express instance.
*/
const app = express();
const port = 3000;
db();
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json({}))

app.get('/', (req, res) =>  {
    res.send('Hello Jennelyn');
})

// routes
const organization = require('./routes/organization.route');
const user = require('./routes/user.route');
app.use(organization);
app.use(user);



app.listen(port, () => {
    console.log('Server running at: ', port);
});
