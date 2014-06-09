// modules =================================================
var express = require('express');
var app     = express();
var mongoose= require('mongoose');
var bodyParser = require('body-parser');
// configuration ===========================================

// config files
var db = require('./config/db');

app.use(bodyParser());
var port = process.env.PORT || 8080; // set our port
 mongoose.connect(db.url); // connect to our mongoDB database (commented out after you enter in your own credentials)

var Bear = require('./app/models/bear');

var router = express.Router();

router.use(function(req, res, next){
	console.log("something is happening"); // this is the place one can check the authenticity of the app user
	next();
});
// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
	res.json({ message: 'hooray! welcome to our api!' });
});

// more routes for our API will happen here



// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);				// expose app


router.route('/bears')
	.post(function(req, res){
		var bear = new Bear();
		bear.name = req.body.name;
		console.log(req.body);
		// bear.name = 'pankaj';

		bear.save(function(err){
			if(err)
				res.send(err);
			res.json({message: 'Bear Created!'});
		});
	});

router.route('/bears')
	.get(function(req, res) {
		Bear.find(function(err, bears) {
			if (err)
				res.send(err);

			res.json(bears);
		});
	});


// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);
