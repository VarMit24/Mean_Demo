var express 	= require('express'),
	app 		= express(),
	bodyParser 	= require('body-parser'),
	mongoose	= require('mongoose'),
	morgan		= require('morgan'),
	config		= require('./config'),
	newUser     = require('./server/controller/loginCtrl'),
	userHash	= require('./server/controller/userHashCtrl'),
	apiRoutes	= require('./route');

mongoose.connect(config.database); // connect to database


// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// use morgan to log requests to the console
app.use(morgan('dev'));

app.get('/',function (req,res) {
	// body...
	res.sendFile(__dirname+"/client/views/index.html")
})

app.use(express.static(__dirname + '/client'));
/*app.use('/js',express.static(__dirname+"/client/js"));*/

//REST API
app.use('/api', apiRoutes);
app.get('/app/checkUser',newUser.checkUserName);
app.get('/app/checkEmail',newUser.checkEmail);
app.post('/app/register',userHash.create);

app.listen(3000,function(){
	console.log("Server is running on -> http://localhost:3000");
})