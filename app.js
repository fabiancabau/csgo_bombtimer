// BASE SETUP
// =================================================================

var express = require('express');

var app = express();
var path = require('path');

var server = require('http').Server(app);
var io = require('socket.io')(server);
var bodyParser = require('body-parser');
var crypto = require("crypto");

var port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'res')));

var create_download = function(token) {
	return ['{\n',
		 '"uri" "http://127.0.0.1:3000"\n',
		 '"timeout" "5.0"\n',
		 '"buffer"  "0.1"\n',
		 '"throttle" "0.5"\n',
		 '"heartbeat" "60.0"\n',
		 '"auth"\n',
		 '{\n',
		 '"token" "'+token+'"\n',
		 '}\n',
		 '"data"\n',
		 '{\n',
		   '"provider"            "1"\n',
		   '"map"                 "1"\n',
		   '"round"               "1"\n',
		   '"player_id"           "1"\n',
		   '"player_state"        "1"\n',
		   '"player_weapons"      "1"\n',
		   '"player_match_stats"  "1"\n',
		'}\n'].join('');
}

// GET OUR ROUTERS ----------------------------------
var match_router 	= require('./routes/match_routes');
// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use(function(req,res,next){
    req.io = io;
    next();
});

app.use('/api', match_router);

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

app.get('/download', function (req, res) {
  var fs = require('fs');
  var filename = "gamestate_integration_bombtimer_"+req.query.token+".cfg"
  var filepath = __dirname + "/tmp/" + filename;

  fs.writeFile(filepath, create_download(req.query.token), function(err) {
	  if(err) {
	    return console.log(err);
	  }
  }); 

  res.setHeader('Content-disposition', 'attachment; filename='+filename);
  res.download(filepath);
});

server.listen(port, function(){
	console.log('Server listening on port ' + port);
});

io.on('connection', function (socket) {
	console.log(socket.id + ' connected');


	socket.on('request-code', function (data) {
		var id = crypto.randomBytes(20).toString('hex');

		socket.emit('gen-code', {code: id});
		socket.join(id);
	});
	
	socket.on('join-room', function (data) {
		socket.join(data.id);

		console.log(socket.id +' joined room ' + data.id)
	});

});

