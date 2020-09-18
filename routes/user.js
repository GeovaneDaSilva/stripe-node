'use strict'

const express = require('express');
const userController = require('../controllers/user')
const service = require('../services/email')




// Init Var
let router = express.Router();
 
let  auth = require('../middlewares/auth'); // auth
const { verificaRole_Admin } = require('../middlewares/auth');


router.post('/register', userController.registerUser); // post register user

router.post('/login', userController.login); // post login user
router.put('/user/:id', auth.verificaToken, userController.updateUser); // get list users

//Relacionado con Models del packege and User
router.post('/user/package/:id', auth.verificaToken, userController.postPackage); // get list users
router.get('/user/:id/packages', auth.verificaToken, userController.getPackage); // get list users
router.get('/users/packages', auth.verificaToken, userController.getUsersAndPackages); // get list users





//
router.get('/user' , [auth.verificaToken, verificaRole_Admin, ], userController.getUsers); // get list users
router.get('/user/:id' , userController.getUser); // get list users







  






module.exports = router;