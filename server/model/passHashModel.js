var mongoose = require('mongoose');

module.exports = mongoose.model('Hash' , {
	name:String,
	salt: String, 
})