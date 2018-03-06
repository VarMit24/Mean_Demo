var userModel	= require('../model/userModel'),
	jwt			= require('jsonwebtoken'),
	userHash	= require('./userHashCtrl'), 
	config		= require('../../config');

module.exports.authenticate = function(req,res){
	 userModel.findOne({
	    name: req.body.name
	  }, function(err, user) {

	    if (err) throw err;

	    if (!user) {
	      res.json({ success: false, message: 'Authentication failed. User not found.' });
	    } 
	    else if (user) {
	      // check if password matches
	      userHash.sendPass(user.name, req.body.password, function (err,data) {
	      	// body...
	      	if (err) throw err;
		      if (user.password != data) {
		        res.json({ success: false, message: 'Authentication failed. Wrong password.' });
		      } else {

		        // if user is found and password is right
		        // create a token
		        var token = jwt.sign(user, config.secret, {
		          expiresIn: 60*60*24 // expires in 24 hours
		        });

		        // return the information including token as JSON
		        res.json({
		          success: true,
		          message: 'Enjoy your token!',
		          token: token
		        });
		      }   
	      });
	    }

	  });
	
}

module.exports.checkUserName = function(req,res){
	 userModel.findOne({
	    name: req.query.name
	  }, function(err, user) {

	    if (err) throw err;
	    console.log(JSON.stringify(user));
	    if (!user) {
			res.json({ success: true, message: 'User Name is available.' });
	    } 

	    //Username is already present
	    else {
	    	res.json({ success: false, message: 'Username already registered.' });
	    }

	  });
	
}

module.exports.checkEmail = function(req,res){
	 userModel.findOne({
	    email: req.query.email
	  }, function(err, email) {

	    if (err) throw err;
	    console.log(JSON.stringify(email));
	    if (!email) {
			res.json({ success: true, message: 'This Email is never used.' });
	    } 

	    //Email is already present
	    else {
	    	res.json({ success: false, message: 'Email already registered.' });
	    }

	  });
	
}