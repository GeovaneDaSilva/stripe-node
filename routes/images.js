'use strict'

const express =  require('express');

const auth = require('../middlewares/auth');
const imagesController = require('../controllers/images');


let router = express.Router();


router.get('/images/:tipo/:img', imagesController.getImages);



module.exports = router;