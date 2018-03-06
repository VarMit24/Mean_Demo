var passModel	= require('../model/passHashModel'),
	userModel	= require('../model/userModel'),
	crypto		= require('crypto');

/**
 * generates random string of characters i.e salt
 * @function
 * @param {number} length - Length of the random string.
 */
var genRandomString = function(length){
    return crypto.randomBytes(Math.ceil(length/2))
            .toString('hex') /** convert to hexadecimal format */
            .slice(0,length);   /** return required number of characters */
};

/**
 * hash password with sha512.
 * @function
 * @param {string} password - List of required fields.
 * @param {string} salt - Data to be validated.
 */
var sha512 = function(password, salt){
    var hash = crypto.createHmac('sha512', salt); /** Hashing algorithm sha512 */
    hash.update(password);
    var value = hash.digest('hex');
    return {
        salt:salt,
        passwordHash:value
    };
};

function saltHashPassword(userpassword) {
    var salt = genRandomString(16); /** Gives us salt of length 16 */
    var passwordData = sha512(userpassword, salt);
    return passwordData;
}

module.exports.create = function(req,res){
	var hashData = saltHashPassword(req.body.password);
	req.body.password = hashData.passwordHash;
	var data = {
		"name" : req.body.name,
		"salt" : hashData.salt
	}
	passModel.findOne({
	    name: req.body.name
	  }, function(err, user) {

	    if (err) throw err;

	    if (!user) {
	    	var newUser = new passModel(data);
			newUser.save(function(err,result){
				var register = new userModel(req.body);
				register.save(function(err,result){
					res.json({success: true, message: 'User created Successfully.' });
				});
			});
	      
	    } 

	    //Username or email already registered
	    else {
	    	res.json({ success: false, message: 'Username or Email already registered.' });
	    }

	  });
}

module.exports.sendPass = function (userName,pass,callback) {
	var data=""
	console.log("User"+userName+" : "+pass)
	passModel.findOne({
	    name: userName
	  }, function(err, user) {

	    if (err) throw err; 
	    if (user) {
	       data = sha512(pass, user.salt);
  		   callback(err,data.passwordHash);  
	    }
	    else{
	    	callback(err);
	    }

	  });
}