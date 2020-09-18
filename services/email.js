'user strict'
require('../config/config')
const nodemailer = require("nodemailer");
//const jwt = require('jsonwebtoken');




//=====================================
//        LOGIN RECOVERD = GET
//=====================================
function recoveryAccount(req, res) {
    //let body = req.body;
    let id = req.params.id

    Titular.findById(id, (err, titularDB) => {

      console.log(titularDB);
      
     
    });
  }

  module.exports  = {

    recoveryAccount

  }