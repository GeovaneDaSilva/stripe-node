'use strict'
const { v1: uuidv4 } = require('uuid');
const { findById } = require('../database/models/stripe');
var StripeModel = require('../database/models/stripe');
const Package = require('../database/models/package');
const stripe = require('stripe')('YOUR_sk_test_stripe');


if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config() //STRIPE

}
const stripeSecretKey = process.env.STRIPE_SECRET_KEY
const stripe_Public_key = process.env.PUBLIC_KEY



console.log( 'SECRET KEY',stripeSecretKey);
console.log( 'PUBLIC KEY',stripe_Public_key);




 async function postPeyment ( req, res ){

    
     
    let body = req.body
    let id = req.params.id
    let pack_id = req.params.package_id
    console.log(id)
//exportar var porque necesito mandar el id por paarametro
   
    const charge = await stripe.charges.create({
        amount: body.amount * 100,
        currency: 'usd',
        source: body.source,
        description: body.description,
        
      }, (err, charge)=>{
          if (err){
            return res.status(401).json({
                  ok: false,
                  message:'Error al en el pago',
                  err: err
              })

          }
          
          StripeModel.count({}, (err, counts) => {

            let factura = 1;
            let newfactura = counts + factura
            
          const stripeModel = new StripeModel({
            id_transaction: charge.id,
            name: charge.source.name,
            type: charge.source.brand,
            last4: charge.source.last4,
            source_token: body.source,
            amount: charge.amount,
            description: charge.description,
            date_create: new Date(),
            receipt_url: charge.receipt_url,
            status: charge.source.status,
            last4: charge.source.last4,

            n_factura: newfactura,
            // ID unique, it's some like tha user: req.user._id package_id: pack_id 

            user: req.user._id,
            package_id: pack_id 

          }); 


           body.user_created = stripeModel.user;
           body.n_factura = stripeModel.package_id;


          stripeModel.save((err, paymentSaved)=>{
              if(err){
                 return res.status(500).json({
                      ok: false,
                      message:'This invoice is paid, or Something on the server didnt work right.',
                      err,
                  })
              }

              if(!paymentSaved){
                  res.status(400).json({
                      ok: false,
                      message:'Server didnt understand the this you gave it.',
                      err,
                  })
              }

              console.log('New Factura', newfactura)


              module.exports  = pack_id // Global parames ID

              updatePackage(); // Here call metodo function Update
   
              res.status(200).json({
                  ok: true,
                  message:'Pago completado con exito',
                  charge,
                  factura: paymentSaved,
                  counts
              })
          })
           
      });
    })
}


function getPayments(req, res){
    
    let desde = req.query.desde || 0;
    desde = Number(desde);
  
    let limite = req.query.limite || 100;
    limite = Number(limite);
    
    //  Usuario.find({ estado: true },'id name img role email')  nao eliminar usuario, apenas cambiar de estado
  
    StripeModel.find({})
    .populate('user', 'nombre email n_buzon phone address')
    .populate('package_id', 'saller name store track_number p l w h date_create nota price description')
      .skip(desde)
      .limit(limite)
      .exec((err, stripes) => {
        if (err) {
          return res.status(500).json({
            ok: false,
            message:
              "Something on the server didnt work right. Please, You need Verify your information id",
            err,
          });
        }
  

        //Usuario.count({}, (err, counts)=>{ estado para dar os filtros apenas de usuarios ativos
        StripeModel.count({}, (err, counts) => {
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
            facturas: stripes,
            TotalFacturas: counts,
          });
        });
    });


}



async function updatePackage( req, res ){

var id_package =  require('../controllers/stripe');
let confirmPay = true


Package.findByIdAndUpdate(id_package, {$set:{status: confirmPay}}, {new: true}, (err, packageUpdate) => {

  if(err){
   return res.status(500).json({
      ok:false,
      message:'no se pudo actualizar'
    });
  }
  if(!packageUpdate){
   return res.status(404).json({
      ok:false,
      message:'no se pudo actualizar'
    });
  }

 return console.log(packageUpdate)


 })
 }

module.exports = {

    postPeyment,
    getPayments,
    
    
    
    
}