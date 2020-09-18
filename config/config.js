
//=====================================
// CONFIGURANDO URL GLOBAL PORTO HEROKU                            
//=====================================

process.env.PORT = process.env.PORT || 3000;


//=====================================
// CONFIGURANDO URL GLOBAL DB                              
//=====================================
//
let urlDB;
process.env.NODE_ENV === process.env.NODE_ENV || 'dev';

if(process.env.NODE_ENV === 'dev'){
    urlDB =  process.env.MONGO_TESTE
    
}else{
   

    urlDB = process.env.MONGO_URI;
     urlDB = 'mongodb://localhost:27017/7876574891'

}



process.env.URLDB = urlDB;


//=====================================
// CONFIGURANDO URL SEED TOKE                             
//=====================================

// Token vencimento 100 horas

process.env.expiresIn = '10h';

//SEED

process.env.SEED = process.env.SEED || 'your_seed_sing'

process.env.AWS_ID = process.env.AWS_ID || 'ID_AWS'
process.env.AWS_SECRET = process.env.AWS_SECRET || 'SECRETE_AWS'


//Auth config AWS

process.env.EMAIL = process.env.EMAIL  ||'EMAIL_AWS',
process.env.PASSWORD = process.env.PASSWORD ||'PASSWORD_AWS'
process.env.HOST = process.env.HOST || "YOUR_HOST_AWS"

process.env.URL_SITE = process.env.URL_SITE || 'http://localhost:3000'
