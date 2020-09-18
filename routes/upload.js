'use strict'

const express = require('express');

const uploadController = require('../controllers/upload');
const fileUpload = require('express-fileupload');

let  auth = require('../middlewares/auth') // auth


let router = express.Router();
router.use(fileUpload()); // livraria para files


router.put('/upload/:tipo/:id',[auth.verificaToken, uploadController.UploadImage]);



module.exports = router;