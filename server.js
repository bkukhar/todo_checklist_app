'use strict';

const express = require('express');
const morgan = require('morgan');
const path = require('path');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const config = require('./app/Config');
const todoRoutes = require('./app/Routes');

process.env.MONGO_URL = 'mongodb://test:password4321@ds213665.mlab.com:13665/nodetest';
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true });
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log('CONNECTED');
});

app.use(express.static(path.join(__dirname, '/public')));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//Authorization
app.use((req, res, next) => {
    if (req.headers.authorization === 'Bearer qwerty') {
        console.log('Authorization passed successfully!');
        next();
    } else {
        console.log('Authorization failed');
        next({
            status: 403,
            error: 'You are not authorized!'
        });
    }
});

const port = config.APP_PORT || 3000;

app.listen(port);
console.log('App listening on port ' + port);

app.use('/api', todoRoutes);

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:' + port);
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    next()
});

app.get('/', function (req, res) {
    res.json('./public/index.html')
});