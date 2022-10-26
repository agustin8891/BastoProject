const mongoose = require('mongoose');
const {Schema} = mongoose;

const schema = new Schema({
	idSenasa: {type: String, required: true},
	establishment: {type: String, required: true},
	type: {type: String, required: true},
	weight: {type: Number, required: false},
	birthDate: {type: Date, required: true},
	race: {type: String, required: true},
	pregnant: {type: Boolean, required: true},
	observations: {type: String, required: false},
	paddockName: {type: String, required: true},
	dueDate: {type: Date, required: false},
	typeDevice: {type: String, required: true},
	deviceNumber: {type: Number, required: true},
},
{
  timestamps: true
});


module.exports = mongoose.model('Animal', schema);

