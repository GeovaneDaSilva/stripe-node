'use strict'

const path = require('path'); // patch de la imagenes
const fs = require('fs');



function getImages( req, res){
let tipo = req.params.tipo
let img = req.params.img

var pathImage = path.resolve( __dirname, `../uploads/${tipo}/${ img }`);

if(fs.existsSync( pathImage)){
   
     res.sendFile( pathImage );
}else{
    var pathNoImage = path.resolve( __dirname, '../assets/no-img.jpg')
     res.sendFile( pathNoImage );
}


}





module.exports = {
    getImages
}