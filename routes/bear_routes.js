var express = require('express'),
	router  = express.Router();


// var Bear     = require('./../models/bear');

// /bears
router.route('/match')

	//create a bear
	.post(function(req, res) {
        if (req.body.round.bomb == 'planted') {
            res.json({message: 'Bomb has been planted'});
        }

		
	});


	// //get all bears
	// .get(function(req, res) {
	// 	Bear.find(function(err, bears){
	// 		if (err)
	// 			res.send(err);

	// 		res.json(bears);
	// 	});
	// });


// /bears/:bear_id
// router.route('/bears/:bear_id')

//     // get the bear with that id (accessed at GET http://localhost:8080/api/bears/:bear_id)
//     .get(function(req, res) {
//         Bear.findById(req.params.bear_id, function(err, bear) {
//             if (err)
//                 res.send(err);
//             res.json(bear);
//         });
//     })

//     // update the bear with this id (accessed at PUT http://localhost:8080/api/bears/:bear_id)
//     .put(function(req, res) {

//         // use our bear model to find the bear we want
//         Bear.findById(req.params.bear_id, function(err, bear) {

//             if (err)
//                 res.send(err);

//             bear.name = req.body.name;  // update the bears info

//             // save the bear
//             bear.save(function(err) {
//                 if (err)
//                     res.send(err);

//                 res.json({ message: 'Bear updated!' });
//             });

//         });

//     })

//     // delete a bear
//     .delete(function(req,res) {

//     	Bear.remove({
//             _id: req.params.bear_id
//         }, function(err, bear) {
//             if (err)
//                 res.send(err);

//             res.json({ message: 'Successfully deleted' });
//         });

//     });


module.exports = router;