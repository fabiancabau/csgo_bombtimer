// BASE SETUP
// =================================================================

var express = require('express');

var app = express();
var path = require('path');

var server = require('http').Server(app);
var io = require('socket.io')(server);
var bodyParser = require('body-parser');

var port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'res')));

// GET OUR ROUTERS ----------------------------------
var match_router 	= require('./routes/match_routes');

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', match_router);

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

server.listen(port, function(){
	console.log('Server listening on port ' + port);
});

io.on('connection', function(socket) {
	console.log(socket.id + ' connected');

	console.log('Generated code:' + 123456);	

	socket.emit('gen-code', {code: 123456});
});

