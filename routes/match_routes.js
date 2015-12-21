var express = require('express'),
	router  = express.Router();

router.route('/match')

	.post(function(req, res) {
		console.log('request received', req.body);
        if (req.body.round.bomb == 'planted') {
        	req.io.sockets.emit('bomb-status', {message: 'Bomb has been planted!'});
        	console.log('bomb has been planted');
            res.json({message: 'Bomb has been planted', status: 'planted'});
        }		
	});


module.exports = router;