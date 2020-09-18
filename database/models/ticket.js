//Web Model
var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var Schema = mongoose.Schema;


var ticketSchema = new Schema({

    number_id: {  type: String, required: [false, ' El nombre es requerido']},
    name: {  type: String, required: [false, ' El subject es requerido']},
    email: {  type: String, required: [false, ' El subject es requerido']},
    subject: {  type: String, required: [false, ' El subject es requerido']},
    status: {  type: String, required: [false, ' El unidad es requerido']},
    message: {  type: String, required: [false, ' El direccion es requerido']},
    category: {  type: String, required: [false, ' La cateroy es requerido']},
    request: {  type: Array, required: [false, ' El request es requerido']},
    archivo: {  type: Array, required: [false, ' El archivo es requerido']},

    
    titular:{ type: Schema.Types.ObjectId, ref: 'Titular'},
    user:{ type: Schema.Types.ObjectId, ref: 'User'},


});

ticketSchema.plugin(uniqueValidator, { message: 'Error, expected {PATH} to be unique.' });


module.exports = mongoose.model('Ticket', ticketSchema);