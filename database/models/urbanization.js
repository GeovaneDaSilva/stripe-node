//Web Model
var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var Schema = mongoose.Schema;


var urbanizationSchema = new Schema({

    nombre: {  type: String, required: [false, ' El subject es requerido']},
    direccion: {  type: String, required: [false, ' El subject es requerido']},
    ciudad: {  type: String, required: [false, ' El subject es requerido']},
    zip_code: {  type: String, required: [false, ' El unidad es requerido']},

    user:{ type: Schema.Types.ObjectId, ref: 'User'},


});

urbanizationSchema.plugin(uniqueValidator, { message: 'Error, expected {PATH} to be unique.' });


module.exports = mongoose.model('Urbanization', urbanizationSchema);