require('./config/config.js')
require('dotenv').config() //STRIPE


const express = require('express')
const bodyParser = require('body-parser');
const morgan = require('morgan')
var cors = require('cors')


const app = express(); // INIT DECLARATION VAR AND CONST      
app.use(morgan('tiny'))

app.use(cors())

//
// Configurar cabeceras y cors



app.use(bodyParser.urlencoded({ extended: false }));// parse application/x-www-form-urlencoded
app.use(bodyParser.json());


require('./database/config'); // IMPORT MONGODB                             


//=====================================
// IMPORTS ROUTES                          
//=====================================

var userRoutes = require('./routes/user');
var imagesRoutes = require('./routes/images');
var uploadRoutes = require('./routes/upload');
var packageRoutes = require('./routes/package');
var stripeRoutes = require('./routes/stripe');
var adminRoutes = require('./routes/admin');










app.use('/api', imagesRoutes)
app.use('/api', uploadRoutes)
app.use('/api', packageRoutes)
app.use('/api', stripeRoutes)
app.use('/api', adminRoutes)






app.use('/api', userRoutes)


//FileSysten Images
var serveIndex = require('serve-index');
app.use(express.static(__dirname + '/'))
app.use('/uploads', serveIndex(__dirname + '/uploads'));


//=====================================
// SERVER LISTEN                         
//=====================================
app.listen(process.env.PORT, () => {
    console.log(`'Express server port: ${process.env.PORT} \x1b[32m%s\x1b[0m', 'online'`);
});

module.exports = app;          




