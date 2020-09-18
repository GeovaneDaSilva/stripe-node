//Web Model
var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var Schema = mongoose.Schema;


var notificationSchema = new Schema({

    urbanizacion_condominio: {  type: String, required: [false, ' El urbanizacion_condominio es requerido']},
    subject: {  type: String, required: [false, ' El subject es requerido']},
    date: {  type: String, required: [false, ' El date es requerido']},
    message: {  type: String, required: [false, ' El message es requerido']},
    archivo: {  type: String, required: [false, ' El archivo es requerido']},
    user:{ type: Schema.Types.ObjectId, ref: 'User'},


});

notificationSchema.plugin(uniqueValidator, { message: 'Error, expected {PATH} to be unique.' });


module.exports = mongoose.model('Notification', notificationSchema);