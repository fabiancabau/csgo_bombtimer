var express = require('express'),
	router  = express.Router();

router.route('/match')

	//create a bear
	.post(function(req, res) {
        if (req.body.round.bomb == 'planted') {
            res.json({message: 'Bomb has been planted'});
        }		
	});


module.exports = router;