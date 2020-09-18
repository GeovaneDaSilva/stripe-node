//Web Model
var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var Schema = mongoose.Schema;

let rolesValidos = {
    values: ['ADMIN_ROLE'],
    message: 'Error, expected {PATH} is not valid.'

}

var adminSchema = new Schema({

    nombre: {  type: String, required: [false, ' El nombre es requerido']},
    apellido: {  type: String, required: [false, ' El apellido es requerido']},
    address: {  type: String, required: [false, ' El address es requerido']},
    email: {  type: String, unique: true, required: [false, ' El email es requerido']},
    password: {  type: String, required: [false, ' El password es requerido']},
    img: {  type: String, required: [false, ' la img es requerido']},
    date_create: {  type: String, required: [false, ' la date_create es requerido']},
    role: { type: String, enum: rolesValidos, required: false, default: 'ADMIN_ROLE'},
    

});

adminSchema.plugin(uniqueValidator, { message: 'Error, expected {PATH} to be unique.' });


module.exports = mongoose.model('Admin', adminSchema);
