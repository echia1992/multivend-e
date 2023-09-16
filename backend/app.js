const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');



app.use(express.json());
app.use(cookieParser());

app.use(
    cors({
        //origin : "http://localhost:3000" ,
        origin: "*",
        credential: true,
    })
);
app.use('/', express.static('uploads'));
app.use(
    bodyParser.urlencoded({
        extended : true,
        limit : "50mb",
    })
);

if (process.env.NODE_ENV !== 'PRODUCTION'){
    require('dotenv').config({
        path: 'backend/config/.env',
    })
};


//app.use(ErrorHandler);

module.exports = app;