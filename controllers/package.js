"use strict";

var Package = require("../database/models/package");


function getPackages(req, res) {

    let desde = req.query.desde || 0;
    desde = Number(desde);
  
    let limite = req.query.limite || 100;
    limite = Number(limite);
    
  
    //  Usuario.find({ estado: true },'id name img role email')  nao eliminar usuario, apenas cambiar de estado
  
    Package.find({})
    .populate('user', 'nombre n_buzon phone address email date_create ref_id_user')
      .skip(desde)
      .limit(limite)
      .exec((err, packages) => {
        if (err) {
          return res.status(500).json({
            ok: false,
            message:
              "Something on the server didnt work right. Please, You need Verify your information id",
            err,
          });
        }
  
           
           
        
        //Usuario.count({}, (err, counts)=>{ estado para dar os filtros apenas de usuarios ativos
        Package.count({}, (err, counts) => {
          //jqueri para contar usuarios
  
  
          if (err) {
            return res.status(500).json({
              ok: false,
              mensaje: "Error de base de datos",
              errors: err,
            });
          }
  
  
          return res.status(200).json({
            ok: true,
            packages: packages,
            TotalPackages: counts,
          });
        });
    });
}



function getPackage(req, res) {

    let id  = req.params.id

  
    Package.findById(
    id, "saller status name store track_number p l w h date_create nota ref_id_user price description")
    .populate('user', 'nombre n_buzon phone address email date_create description price token')
    .exec((err, packageDB) => {
    if (err) {
        return res.status(500).json({
        ok: false,
        mensaje: "Error de base de datos",
        errors: err,
        });
    }


    return res.status(200).json({
        ok: true,
        package: packageDB,
    });
    });
}
  



function postPackage( req, res){

    let body = req.body
    let status = false
    var paquete = new Package({
    saller: body.saller,
    name: body.name,
    store: body.store,
    track_number: body.track_number,
    p: body.p,
    l: body.l,
    w: body.w,
    h: body.h,
    delivery: body.delivery,
    nota: body.nota,
    date_create: new Date(),
    price:body.price,
    description: body.description,
    token: body.token,
    //user: req.user._id,
    //ref_id_user: req.user._id
    
  });

    
paquete.save((err, packageSAVED) =>{

    if (err) {
        return res.status(500).json({
          message: "Something on the server didnt work right post.",
          err,
        });
      }
  
      if (!packageSAVED) {
       return res.status(404).json({
          ok: false,
          message: "A file doesnt exist at that address",
          user,
        });
      }


      return res.status(200).json({
        ok: true,
        message: 'Everything is normal, user updated")',
        package: packageSAVED,
      });

})

  
  
}

function updatePackage(req, res) {

    let body = req.body
    let id = req.params.id

    
    Package.findByIdAndUpdate(id, body, {new: true, useFindAndModify: false }, (err, paquete) => {
        if (err) {
          return res.status(500).json({
            message: "Something on the server didnt work right put.",
            err,
          });
        }
    
        if (!paquete) {
         return res.status(404).json({
            ok: false,
            message: "A file doesnt exist at that paquete",
            paquete,
          });
        }
    
        
    
        paquete.save((err, paqueteUpdated) => {
          if (err) {
            return res.status(500).json({
              ok: false,
              message:
                "Server didnt understand the URL you gave it, You need will check ID.",
              err,
            });
          }
    
          if (!paqueteUpdated) {
            res.status(400).json({
              ok: false,
              message:
                "Server didnt understand the URL you gave it, You need will check ID.",
              err,
            });
          }
    
          return res.status(200).json({
            ok: true,
            message: 'Everything is normal, user updated")',
            paquete: paqueteUpdated,
          });
        });
      });

   
  }

  //=====================================
//        REMOVE Package = DELETE
//=====================================

function deletePackage(req, res) {
  let id = req.params.id;

  Package.findByIdAndRemove(id, (err, packageDelete) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        message: "Something on the server didnt work right.",
        err,
      });
    }

    if (!packageDelete) {
    return  res.status(400).json({
        ok: false,
        message:
          "Server didnt understand the URL you gave it, You need will check ID.",
      });
    }

    return res.status(200).json({
      ok: true,
      message: "Everything is normal, user deleted success",
      package: packageDelete,
    });
  });
}


module.exports = {
    postPackage,
    getPackages,
    getPackage,
    updatePackage,
    deletePackage
  };