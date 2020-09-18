'use strict'

// modules
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
var Admin = require("../database/models/admin");



//=====================================
//           SAVE USER  = POST
//=====================================

function registerAdmin(req, res) {

    Admin.count({}, (err, counts) => {
  
    var body = req.body;
    
    // create object user
    var admin = new Admin({
      nombre: body.nombre, // This is very diferente od the post, do you need add model gona be update
      apellido: body.apellido, 
      email: body.email,
      phone: body.phone,
      address: body.address,
      password: bcrypt.hashSync(body.password, 10),
      img: body.img,
      date_create: new Date(),
      role: body.role,
    });
  
  
    admin.save((err, adminStorage, next) => {
      if (err) {
        return res.status(500).json({
          ok: false,
          message: "Something on the server didnt work right.",
          err,
        });
      }
      if (!adminStorage) {
        res.status(404).json({
          ok: false,
          message: "A file doesnt exist at that address",
          admin: adminStorage,
        });
      }
      

      return res.status(201).json({
        ok: true,
        message: 'Everything is normal ("201 Created")',
        admin: adminStorage,
        counts: counts
  
      });
    });
  });
}

//=====================================
//           GET USERS = GET
//=====================================


function getAdmins(req, res) {
    let desde = req.query.desde || 0;
    desde = Number(desde);
  
    let limite = req.query.limite || 1000000000000000000;
    limite = Number(limite);
    
  
    //  Usuario.find({ estado: true },'id name img role email')  nao eliminar usuario, apenas cambiar de estado
  
    Admin.find({}, 'id img  email nombre apellido role  address phone ')
    //.populate('packages', 'saller name store track_number p l w h date_create nota')
      .skip(desde)
      .limit(limite)
      .exec((err, admins) => {
        if (err) {
          return res.status(500).json({
            ok: false,
            message:
              "Something on the server didnt work right. Please, You need Verify your information id",
            err,
          });
        }
  
           
           
        
        //Usuario.count({}, (err, counts)=>{ estado para dar os filtros apenas de usuarios ativos
        Admin.count({}, (err, counts) => {
          //jqueri para contar usuarios
  
  
         /* for(let i=0;i<users.length;i++){
  
  
            users[i].password = [];
            users[i]._id = []
            users[i].__v = i;
     
  
            //const saltRounds = 10;
  
            let id = users[i]._id
  
            let passworD = bcrypt.hashSync('stpr2020', 10)
  
  
            console.log('new ****password',passworD);
            console.log('new #### id', id);
  
  
            User.findByIdAndUpdate({_id: id}, {$set:{password:passworD,__v: i,users:[]}}, {new: true}, (err, doc) => {
            })
  
  
          }
          
  */
  
  
  
  
  
  
  
  
          return res.status(200).json({
            ok: true,
            admins: admins,
            TotalAdmins: counts,
          });
        });
      });
  }


  //=====================================
//        LOGIN USER = POST
//=====================================

function login(req, res) {
    let body = req.body;
  
    Admin.findOne({ email: body.email }, (err, userDB) => {
      if (err) {
        return res.status(500).json({
          ok: false,
          message: "Something on the server didnt work right.",
        });
      }
      if (!userDB) {
        return res.status(400).json({
          ok: true,
          message:
            "Server didnt understand the URL you gave it, You need will check ID, if user exist.", body,
        });
      }
  
      if (!bcrypt.compareSync(body.password, userDB.password)) {
        return res.status(400).json({
          ok: false,
          err: {
            mensaje:
              " Server refuses to give you a file, authentication wont help, your information is not valid",
          },
        });
      }
  
      
      let token = jwt.sign({
          user: userDB
            
        },process.env.SEED,{ expiresIn: process.env.expiresIn}) // Verify the environment in config
    
     return res.status(200).json({
        ok: true,
        message: "Login was Success",
        userDB,
        token,
        
      });
    });
  }


  //=====================================
//         UPDATE ADMIN = PUT
//=====================================

function updateAdmin(req, res) {
    let id = req.params.id;
    let body = req.body;
  
    Admin.findByIdAndUpdate(id, body, {new: true, useFindAndModify: true }, (err, admin) => {
      if (err) {
        return res.status(500).json({
          message: "Something on the server didnt work right put.",
          err,
        });
      }
  
      if (!admin) {
       return res.status(404).json({
          ok: false,
          message: "A file doesnt exist at that address",
          admin,
        });
      }
  
  
      const saltRounds = 10;
  
              
        
        
        if(body.password != null) {
          admin.password = bcrypt.hashSync(body.password, saltRounds);
        }
  
  
  
      admin.save((err, adminUpdated) => {
        if (err) {
          return res.status(500).json({
            ok: false,
            message:
              "Server didnt understand the URL you gave it, You need will check ID.",
            err,
          });
        }
  
        if (!adminUpdated) {
          res.status(400).json({
            ok: false,
            message:
              "Server didnt understand the URL you gave it, You need will check ID.",
            err,
          });
        }
  
        return res.status(200).json({
          ok: true,
          message: 'Everything is normal, admin updated")',
          admin: adminUpdated,
        });
      });
    });
  }

  //=====================================
//           GET USER = GET
//=====================================


function getAdmin(req, res) {
    let id  = req.params.id
  
    
  Admin.findById(
    id,
    "nombre apellido email img role address")
  .exec((err, adminDB) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        mensaje: "Error de base de datos",
        errors: err,
      });
    }
  
  
    return res.status(200).json({
      ok: true,
      admin: adminDB,
    });
  });
  }


module.exports =  {

    registerAdmin,
    getAdmins,
    getAdmin,
    updateAdmin,
    login,

}