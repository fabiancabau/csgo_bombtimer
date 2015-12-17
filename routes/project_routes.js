var express = require('express'),
	router  = express.Router();


var Project     = require('./../models/project');

// /projects
router.route('/projects')

	//create a project
	.post(function(req, res) {

		var project = new Project();


		project.name = req.body.name;
        project.description = req.body.description;
        project.value = req.body.value;
        project.installments = req.body.installments;
        project.client_id = req.body.client_id

		project.save(function(err) {
			if (err)
				res.send(err);

			res.json({ message: 'Project created!' });
		});

	})


	//get all projects
	.get(function(req, res) {
		Project.find(function(err, projects){
			if (err)
				res.send(err);

			res.json(projects);
		});
	});


// /projects/:project_id
router.route('/projects/:project_id')

    // get the project with that id (accessed at GET http://localhost:8080/api/projects/:project_id)
    .get(function(req, res) {
        Project.findById(req.params.project_id, function(err, project) {
            if (err)
                res.send(err);
            res.json(project);
        });
    })

    // update the project with this id (accessed at PUT http://localhost:8080/api/projects/:project_id)
    .put(function(req, res) {

        // use our project model to find the project we want
        Project.findById(req.params.project_id, function(err, project) {

            if (err)
                res.send(err);

            project.name = req.body.name;
            project.description = req.body.description;
            project.value = req.body.value;
            project.installments = req.body.installments;

            // save the project
            project.save(function(err) {
                if (err)
                    res.send(err);

                res.json({ message: 'Project updated!' });
            });

        });

    })

    // delete a project
    .delete(function(req,res) {

    	Project.remove({
            _id: req.params.project_id
        }, function(err, project) {
            if (err)
                res.send(err);

            res.json({ message: 'Successfully deleted' });
        });

    });


module.exports = router;