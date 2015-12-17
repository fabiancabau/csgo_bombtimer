var express = require('express'),
	router  = express.Router();


var User     = require('./../models/user');
var jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens
var config = require('../config'); // get our config file

// /clients
router.route('/users/setup')

	//create a client
	.get(function(req, res) {

		var user = new User({ 
            name: 'fabian', 
            password: 'password',
            admin: true 
        });

		user.save(function(err) {
        if (err) throw err;

        console.log('User saved successfully');
            res.json({ success: true });
        });

	});


router.route('/users')

    .get(function(req, res) {

        User.find({}, function(err, users) {
            res.json(users);
        });

    });


router.route('/authenticate')

    .post(function(req, res) {

        User.findOne({
            name: req.body.name
        }, function(err, user) {

            if (err) throw err;

            if (!user) {
                res.json({success: false, message: 'Auth failed. User not found'});
            }
            else if (user) {

                if (user.password != req.body.password) {
                    res.json({success: false, message: 'Auth failed. Wrong password'});
                }
                else {
                    var token = jwt.sign(user, config.secret, {expiresInMinutes: 1440});

                    res.json({
                        success: true,
                        message: 'Enjoy your token!',
                        token: token
                    });
                }

            }

        });
    });



module.exports = router;