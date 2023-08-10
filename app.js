const express = require('express');
const cookieParser = require('cookie-parser');


const router = require('./src/routes/index');

var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/', router);

module.exports = app;