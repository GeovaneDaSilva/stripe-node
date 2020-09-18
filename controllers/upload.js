var User = require('../database/models/user');




const fs = require('fs');  // metodo para borrar imagen y no dejar duplicar (hay que tener cuidado y hacer pruebas porque no es compatible en todas las verciones).


function UploadImage( req, res, next){


    var tipo = req.params.tipo;  //tipo de archivo que vamos recibi
    var id = req.params.id;  // Id referente la coleccion que vamos usar las imagenes de perfil
   
    //Tipos de coleccion
    var tipoValidos = ['users', 'titulares', 'contratos', 'notifications']; // base de dados
    if(tipoValidos.indexOf( tipo ) < 0 ){ // Un tipo de validaccion 
        return res.status(400).json({
         
            ok: false,
            mensaje: "Tipo de coleccion no es valida",
            errr:{mensaje:"debes seleccionar una coleccion valida, ejemplo: 'http://localhost:3000/upload/posts/id', la colleccion tienes que esta en el plural " }
    
        }); //URL DAS IMAGENS http://localhost:3002/images/usuarios/5e811d7313127f0abc04b74d-10.JPG para PUT verificar URL arriba
 
    }

  if(!req.files){ // validando se hay archivos
      
    return res.status(400).json({
         
        ok: false,
        mensaje: "You need select of the image",
        err:{mensaje:"You need select of the image"}

    });
  }
  //Obtener nombre del archivo
  var archivo = req.files.img; //configuraca

  //var archivo = req.files.copia_escritura; //PDF


  var nombreCortado = archivo.name.split('.');

  console.log(nombreCortado);
  extencionArchivo = nombreCortado[nombreCortado.length -1];


  //solo estas extenciones aceptamos
  var extencionesValidas = ['png', 'jpg', 'gif', 'jpeg', 'png', 'JPG', 'PDF', 'pdf', 'docx']; //Mayusculas y minusculas son importantes

  if( extencionesValidas.indexOf(extencionArchivo) < 0 ){ // validaccion
    return res.status(400).json({
         
        ok: false,
        mensaje: "Extension no valida",
        err:{ mensaje:"Extensiones validas son:" + extencionesValidas.join(', ')}

    });
  }

 //Configurar el nombre del archivo
 var nombreArchivo = `${id}-${new Date().getMilliseconds()}.${ extencionArchivo}`; //aqui generamos un id nombre que se crea en milesseconds

 //Mover Archivo a la carpeta correcta
 var path = `./uploads/${ tipo }/${nombreArchivo}`; //  Definimos las rutas de los archivos

 archivo.mv( path, err =>{  //para mover el archivo a la carpeta correcta
     if(err){
        return res.status(500).json({
         
            ok: false,
            mensaje: "Error al mover archivo",
            errors: err
    
        });
     }
 });

 return subitPorTipo( tipo, id, nombreArchivo, res); // funccion para subir archivo

 };


function subitPorTipo( tipo, id, nombreArchivo, res) {

    
    if(tipo === 'users'){

        User.findById(id, (err, user)=>{
            var pathViejo = './uploads/users/' + user.img;

            //metodo para borrar imagen vieja | Obg: ese metodo no funciona en algunas versiones de node
            if( fs.existsSync(pathViejo)){
                fs.unlinkSync( pathViejo );

            }

            user.img = nombreArchivo;

            user.save( (err, userActualizado)=>{
                

                  return  res.status(200).json({
                    ok: true,
                    mensaje: 'Imagen actualizada correctamente',
                    user: userActualizado,
                    
                })

            })

        })
    }




    if(tipo === 'contratos'){

        Titular.findById(id, (err, titular)=>{
            var pathViejo = './uploads/contratos/' + titular.copia_escritura;

            //metodo para borrar imagen vieja | Obg: ese metodo no funciona en algunas versiones de node
            /* if( fs.existsSync(pathViejo)){
               return fs.unlink( pathViejo );
  
            }
 */

            titular.copia_escritura = nombreArchivo;

            titular.save( (err, titularActualizado)=>{

                
                    console.log('soy un arquivo name ',titular.copia_escritura);
                    

                   return res.status(200).json({
                    ok: true,
                    mensaje: 'Archivo actualizada correctamente',
                    titular: titularActualizado,
                    
                })

            })

        })
    }


}


module.exports = {
    UploadImage
}


