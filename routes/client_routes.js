var express = require('express'),
	router  = express.Router();


var Client     = require('./../models/client');

// /clients
router.route('/clients')

	//create a client
	.post(function(req, res) {

		var client = new Client();

        client.company_name = req.body.company_name;
        client.phone = req.body.phone;
		client.name = req.body.name;
        client.date_added = req.body.date_added;

		client.save(function(err) {
			if (err)
				res.send(err);

			res.json({ message: 'Client created!' });
		});

	})


	//get all clients
	.get(function(req, res) {
		Client.find(function(err, clients){
			if (err)
				res.send(err);

			res.json(clients);
		});
	});


// /clients/:client_id
router.route('/clients/:client_id')

    // get the client with that id (accessed at GET http://localhost:8080/api/clients/:client_id)
    .get(function(req, res) {
        Client.findById(req.params.client_id, function(err, client) {
            if (err)
                res.send(err);
            res.json(client);
        });
    })

    // update the client with this id (accessed at PUT http://localhost:8080/api/clients/:client_id)
    .put(function(req, res) {

        // use our client model to find the client we want
        Client.findById(req.params.client_id, function(err, client) {

            if (err)
                res.send(err);

            client.name = req.body.name;  // update the clients info

            // save the client
            client.save(function(err) {
                if (err)
                    res.send(err);

                res.json({ message: 'Client updated!' });
            });

        });

    })

    // delete a client
    .delete(function(req,res) {

    	Client.remove({
            _id: req.params.client_id
        }, function(err, client) {
            if (err)
                res.send(err);

            res.json({ message: 'Successfully deleted' });
        });

    });



module.exports = router;