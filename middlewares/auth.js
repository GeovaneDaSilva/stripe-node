const jwt = require('jsonwebtoken') // https://www.npmjs.com/package/jsonwebtoken

//=====================================
// CONFIGURANDO tokem                            
//=====================================

let verificaToken =  function (req, res, next){

    let token = req.get('token');

    jwt.verify(token, process.env.SEED, (err, decoded)=>{

        if( err ){
            return res.status(401).json({
                ok:false,
                err:{
                    mensaje:'Must be authenticated'
                }
            });

        }
        req.user = decoded.user;
        next();
    });
};

let verificaRole_Admin = (req, res, next) =>{

    let user = req.user;

    if(user.role === 'ADMIN_ROLE'){
       

    }else{
        return res.status(401).json({
            ok:false,
            mensaje:{
                mensaje:'Must be authenticated ADMIN_ ROLE',
            
            }
            
        });

    }
    next(); // Is very important for excute of the function

}

let verificaRole_User = (req, res, next) =>{

    let user = req.user;

    if(user.role === 'USER_ROLE'){
       

    }else{
        return res.status(401).json({
            ok:false,
            mensaje:{
                mensaje:'Must be authenticated USER_ ROLE',
            
            }
            
        });

    }
    next(); // Is very important for excute of the function

}

module.exports ={
    verificaToken, 
    verificaRole_Admin,
    verificaRole_User
}

