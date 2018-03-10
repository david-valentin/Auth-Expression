var util = require('util');
var path = require("path");
var bcrypt = require('bcryptjs');


// corsOptions doesn't include Delete because we never delete from the database
const corsOptions = {
			methods: ['GET', 'PUT', 'POST'],
			origin: '*',
			allowedHeaders: ['Content-Type']
	};

// Changed the config required file to the root
const knexConfig = require('../backend/knexfile');
const knex = require('knex')(knexConfig.development);


// Exports all the standard functions
module.exports = function (app) {

	app.get('/', function (req, res, next) {

		// res.render('index');
		res.render('index');
	});

	// Get request
	app.get('/about', function (req, res, next) {
		res.render('about');
	});

	// Secure get
	app.get('/secure/:email', function (req, res, next) {
		console.log("Req.body.email: " + req.params.email);
		res.render('secure', {email : req.params.email});
	});

	// signup get => gets the page
	app.get('/signup', function (req, res, next) {
		res.render('signup', {email : req.body.email});
	});

	// signup post request => posts to the server
	app.post('/signup', function (req, res, next) {

		// Salt => generated randomly
		var salt = bcrypt.genSaltSync(10);
		// hashed password
		var hash = bcrypt.hashSync(req.body.password, salt);
		var roomNum = " " + req.body.roomNum;
		// {
		// 	'email': req.body.email,
		// 	'password':hash,
		// 	'hall' : req.body.hall,
		// 	'roomNum': req.body.roomNum,
		// 	'parking_lot': req.body.parking_lot
		// }
		// Logging the user submitted data
		console.log(
			"\n Email: " + req.body.email +
			"\n Hash: " + hash +
			"\n Hall: " + req.body.hall +
			"\n Room Num: " + roomNum +
			"\n Parking Lot: " + req.body.parking_lot);
		console.log(knexConfig);
		console.log("Email: " + req.body.email);

		// Check if the users email is already in use
		knex('users').insert(
			{
				'email': req.body.email,
				'password': hash,
				'hall' : req.body.hall,
				'roomNum': req.body.roomNum,
				'parking_lot': req.body.parking_lot
			}
		)
		.then(function(response) {
				console.log("Response: " + response)
				res.redirect('/login');
		})
		.catch(function(error) {
			console.log(error);
			req.flash('error', 'email and password are incorrect');
			res.redirect('/unauthorised');
		});
	});

	// GET login page
	app.get('/login', function (req, res, next) {
		// res.render('login');
		res.render('login', { flash: req.flash() } );
	});

	// POST Login
	app.post('/login', function (req, res, next) {

		// you might like to do a database look-up or something more scalable here
		knex('users').where({
			email:req.body.email
		})
		.then(function(response) {
			console.log("Password: " + req.body.password);
			console.log("Other Password: " + response[0].password);
			// TODO: Use middleware function to check for response null
			// For now just check if the response if null
			let hashed_pass = " " + response[0].password
			if (response !== null) {
				if (bcrypt.compareSync(req.body.password, response[0].password)) {
					console.log("AUTHENTICATED");
					req.session.authenticated = true;
					console.log("Req.body.email: " + req.body.email);
					res.redirect('/secure/' + req.body.email);
				} else {
					console.log("email and password are incorrect");
					req.flash('error', 'email and password are incorrect');
					res.redirect('/secure');
				}
			} else {
					console.log("email and password are incorrect");
					req.flash('error', 'email and password are incorrect');
					res.redirect('/login');
			}
		})
		.catch(function(error) {
			console.log("You're an absolute BELLEND " + error);
			req.flash('error', 'email and password are incorrect');
			res.redirect('/login');
		});
	});

	app.get('/logout', function (req, res, next) {
		delete req.session.authenticated;
		res.redirect('/');
	});

	//  a get requests that retrieves all the users
	app.get('/users', (request, response) => {
	    knex.select().table('users')
	    .then(function(results){
            response.send(results);
        });
	});


	// NEW ROUTES
  //
	// // a post request that adds new user to the database
	// app.post('/users/', (request, response) =>{
	//     knex('users').insert(request.body).then(function(id){
	//         knex('users').where({id:id[0]}).then(results=>{response.send(results[0])});
	//     });
	// });
  //
	// //  gets the user account of the email with the proper email and password passed into it.
	// app.get('/users/:email/:password', (request, response) => {
	//     knex('users').where({
	//       'email': request.params.email,
	//       'password': request.params.password
	//     })
	//     .then(function(results) {
	//         response.send(results)
	//     });
	// });


};
