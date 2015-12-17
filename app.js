// BASE SETUP
// =================================================================

var express = require('express');

var app = express();
var application_root = __dirname;

var server = require('http').Server(app);
var path = require('path');
var morgan      = require('morgan');
var bodyParser = require('body-parser');

var port = process.env.PORT || 8001;


app.use(express.static(path.join(__dirname, '/')));
app.use(morgan('dev'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// ===============================================================

var mongoose   = require('mongoose');
mongoose.connect('mongodb://localhost'); // connect to our database


// GET OUR ROUTERS ----------------------------------
var bear_router 	= require('./routes/bear_routes');
	// client_router 	= require('./routes/client_routes'),
	// project_router	= require('./routes/project_routes'),
	// user_router		= require('./routes/user_routes');
	// auth_router		= require('./routes/auth_routes');


// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api

// app.use('/api', auth_router);
// app.use('/api', user_router);
app.use('/api', bear_router);
// app.use('/api', client_router);
// app.use('/api', project_router);




app.listen(port, function(){
	console.log('Server listening on port ' + port);
});

