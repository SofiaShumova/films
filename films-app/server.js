const dotenv = require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const nunjucks = require('nunjucks');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');

const router = require('./routes/router');

const port = 3000;
const jsonParser = bodyParser.json({ limit: '50mb' });
const urlencodedParser = bodyParser.urlencoded({
    extended: false,
    limit: '50mb',
});

const app = express();
const url =
    'mongodb+srv://user:123@cluster0.gsgkt.mongodb.net/filmsdb?retryWrites=true&w=majority';

nunjucks.configure('views', {
    autoescape: true,
    express: app,
});

app.set('view engine', 'njk');
app.set('views', 'views');

app.use(urlencodedParser);
app.use(jsonParser);

app.use(
    session({
        secret: process.env.JWT_SECRET,
        saveUninitialized: true,
        resave: true,
    })
);

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'views')));

app.use(router);

mongoose.connect(url, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    useCreateIndex: true,
});

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});