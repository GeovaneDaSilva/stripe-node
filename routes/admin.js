'use strict'

const express = require('express');
const adminController = require('../controllers/admin');



// Init Var
let router = express.Router();
 
let  auth = require('../middlewares/auth'); // auth
const { verificaRole_Admin } = require('../middlewares/auth');


router.post('/register/admin', adminController.registerAdmin); // post register user
router.get('/users/admin' , [auth.verificaToken, verificaRole_Admin, ], adminController.getAdmins); // get list users
router.get('/user/admin/:id' , adminController.getAdmin); // get list users

router.post('/login/admin',  adminController.login); // post login user
router.put('/admin/:id', auth.verificaToken, adminController.updateAdmin); // get list users

//router.put('/admin/:id', auth.verificaToken, userController.updateUser); // get list users


  






module.exports = router;