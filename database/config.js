const express = require("express")

const mongoose = require('mongoose');


var app = express();



mongoose.connect(process.env.URLDB, {useNewUrlParser: true, useUnifiedTopology: true }, 
(err, res) => {
        if (err) throw err;
        console.log('Base de datos  puerto 27017: \x1b[32m%s\x1b[0m', 'online');
        
    });




    module.exports = app;

