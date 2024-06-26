const express = require('express');
const ErrorHandler = require('./middleware/error');
const app = express();
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:3001',
    credentials: true
}));
app.use('/', express.static('uploads'));
app.use(
    bodyParser.urlencoded({
        extended : true,
        limit : "50mb",
    })
);


if (process.env.NODE_ENV !== 'PRODUCTION'){
    require('dotenv').config({
        path: "backend/config/.env",
    })
}

const user = require('./controller/user');
const http = require("http");


app.use('/api/v2/user', user);

app.use(ErrorHandler);

module.exports = app;