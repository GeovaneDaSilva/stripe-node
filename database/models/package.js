//Web Model
var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var Schema = mongoose.Schema;


var packageSchema = new Schema({

    saller: {  type: String, required: [false, ' El vendedor es requerido']},
    name: {  type: String, required: [true, ' El name es requerido']},
    store: {  type: String, required: [false, ' El armacen es requerido']},
    track_number: {  type: String, required: [false, ' El Número de rastreo es requerido']},
    p: {  type: Number, required: [false, ' El Peso libra']},
    l: {  type: Number, required: [false, ' El largo']},
    w: {  type: Number, required: [false, ' El ancho']},
    h: {  type: Number, required: [false, ' El altura']},
    date_create: {  type: Date, required: [false, ' El date']},
    nota: {  type: String, required: [false, ' La nota es requerido']},
    status: {  type: Boolean, default: false, required: [true, ' La description es requerido']},
    price: {  type: Number, required: [true, ' La precio es requerido']},
    description: {  type: String, required: [true, ' La description es requerido']},
    token: {  type: String, required: [false, ' La token es requerido']},


    delivery: {  type: String, required: [false, ' La delivery es requerido']},
    user:{ type: Schema.Types.ObjectId, ref: 'User'},


});


packageSchema.plugin(uniqueValidator, { message: 'Error, expected {PATH} to be unique.' });


module.exports = mongoose.model('Package', packageSchema);