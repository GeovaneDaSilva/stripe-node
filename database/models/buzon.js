//Web Model
var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
const { any } = require('underscore');

var Schema = mongoose.Schema;


var buzonSchema = new Schema({

    n_buzon: {  type: Number, unique: true, required: [false, ' El buzon es requerido']},
    name: {  type: String, required: [false, ' El name es requerido']},
    email: {  type: String, unique: true, required: [false, ' El email es requerido']},
    phone: {  type: String, required: [false, ' El phone es requerido']},
    address: {  type: String, required: [false, ' El address es requerido']},
    message: {  type: String, required: [false, ' El message es requerido']},
    termino: {  type: Boolean, required: [false, ' La termino es requerido']},
    direccion: {  type: String, required: [false, ' El message es requerido']},
    user_id: {  type: String, required: [false, ' El user es requerido']},

    user:{ type: Schema.Types.ObjectId, ref: 'User'},

   

});

buzonSchema.plugin(uniqueValidator, { message: 'Error, expected {PATH} to be unique.' });


module.exports = mongoose.model('Buzon', buzonSchema);