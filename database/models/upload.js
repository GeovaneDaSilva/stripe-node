//Web Model
var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var Schema = mongoose.Schema;


var uploadSchema = new Schema({

    
   
    archivo: {  type: String, required: [false, ' El archivo es requerido']}



});

uploadSchema.plugin(uniqueValidator, { message: 'Error, expected {PATH} to be unique.' });


module.exports = mongoose.model('Upload', uploadSchema);