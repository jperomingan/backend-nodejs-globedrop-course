const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 3000;
const { db } = require('./db/index');
const { cors } = require('./utils/middleware');
const organization = require('./routes/organization.route');
const user = require('./routes/user.route');
const { get } = require('mongoose');
const passport = require('passport');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./configuration/swagger');

app.get('/', (req, res) => {
    res.send('Hello Jenn');
});

app.get('/fail', (req, res) => {
    res.send('Authentication failed');
});

app.use(cors)
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({}));
app.use(passport.initialize());
app.use(passport.session());

/** swagger route */
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

db();
app.use(user);
app.use(organization);

app.listen(port, () => {
    console.log('Server runs at port: ', port);
});

