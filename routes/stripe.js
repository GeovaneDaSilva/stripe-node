'use strict'

const express = require('express');
const stripeController = require('../controllers/stripe')




// Init Var
let router = express.Router();
 
let  auth = require('../middlewares/auth'); // auth
const { verificaRole_Admin, verificaToken } = require('../middlewares/auth');


router.post('/payment/:id/:package_id', verificaToken, stripeController.postPeyment); // post register user

router.get('/payments/', verificaToken, stripeController.getPayments); // post register user



  






module.exports = router;