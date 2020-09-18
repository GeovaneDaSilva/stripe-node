//Web Model
var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var Schema = mongoose.Schema;


var stripeSchema = new Schema({

    id_transaction: {  type: String, required: [false, ' El vendedor es requerido']},
    name: {  type: String, required: [false, ' El name es requerido']},
    type: {  type: String, required: [false, ' El name es requerido']},
    source_token: {  type: String, required: [false, ' El type metodo es requerido']},
    description: {  type: String, required: [false, ' El description de rastreo es requerido']},
    date_create: {  type: Date, required: [false, ' El date']},
    amount: {  type: Number, required: [false, ' La amount es requerido']},
    description: {  type: String, required: [false, ' La description es requerido']},
    status: {  type: String, required: [false, ' La description es requerido']},
    receipt_url: {  type: String, required: [false, ' La receipt_url es requerido']},

    last4: {  type: String, required: [false, ' La last4 es requerido']},
    n_factura: {  type: Number, required: [false, ' La n_factura es requerido']},

    user:{ type: Schema.Types.ObjectId, ref: 'User'}, // Here you can see of the user did create of the package
    package_id:{ type: Schema.Types.ObjectId, unique: true, ref: 'Package'}, // Here you can see of the user did create of the package



});

stripeSchema.plugin(uniqueValidator, { message: 'Error, expected {PATH} to be unique.' });


module.exports = mongoose.model('Stripe', stripeSchema);