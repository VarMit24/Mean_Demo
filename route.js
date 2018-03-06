var
	express 	= require('express'),
	login    	= require('./server/controller/loginCtrl'),
	tech    	= require('./server/controller/techCtrl'),
  jwt       = require('jsonwebtoken'),
	config		= require('./config');	
// API ROUTES -------------------

// get an instance of the router for api routes
var apiRoutes = express.Router(); 

// route to authenticate a user (POST http://localhost:8080/api/authenticate)
apiRoutes.post('/authenticate', login.authenticate)

// route middleware to verify a token
apiRoutes.use(function(req, res, next) {

  // check header or url parameters or post parameters for token
  var bearerToken;
  var bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader !== 'undefined') {
      var bearer = bearerHeader.split(" ");
      bearerToken = bearer[1];
     // req.token = bearerToken;
    }
  var token = req.body.token || req.query.token || bearerToken;

  // decode token
  if (token) {

    // verifies secret and checks exp
    jwt.verify(token, config.secret, function(err, decoded) {      
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });    
      } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;    
        next();
      }
    });

  } else {

    // if there is no token
    // return an error
    return res.status(403).send({ 
        success: false, 
        message: 'No token provided.' 
    });
    
  }
});


// route to get all the list of technologies
apiRoutes.get('/technology',tech.list)

//route to save a particular technology
apiRoutes.post('/add/technology',tech.create)


module.exports = apiRoutes;