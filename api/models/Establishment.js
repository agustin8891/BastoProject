const mongoose = require('mongoose');
const {Schema} = mongoose;

const schemaEstablishment = new Schema({
	name: {type: String, required: true},
});


module.exports = mongoose.model('Establishment', schemaEstablishment);