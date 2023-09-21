const express = require('express');
const ErrorHandler = require('./middleware/error');
const app = express();
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(express.json());
app.use(cookieParser());
app.use(cors());
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

const customer = require('./controller/customer');


app.use('/api/v2/customer', customer);

app.use(ErrorHandler);

module.exports = app;