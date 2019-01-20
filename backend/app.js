const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const gamesRoutes = require('./routes/game');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers', 
        'Origin, X-Requested-With, Content-Type, Accept'
    );
    res.setHeader(
        'Access-Control-Allow-Methods',
        'GET, POST, PUT, DELETE, OPTIONS'
    );
    next();
});

app.use("/api/game/", gamesRoutes);

module.exports = app;