//Web Model
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

var Schema = mongoose.Schema;


var logSchema = new Schema({

   log: {  type: String, required: [false, ' The log is require']},


});

logSchema.plugin(uniqueValidator, { message: 'Error, expected {PATH} to be unique.' });


module.exports = mongoose.model('Log', logSchema);
