var util = require('util');
var path = require("path");

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
	app.get('/welcome', function (req, res, next) {
		res.render('welcome');
	});

	// Secure get
	app.get('/secure', function (req, res, next) {
		res.render('secure', {username : "Dave"});
	});

	// Get login
	app.get('/login', function (req, res, next) {
		// res.render('login');
		res.render('login', { flash: req.flash() } );
	});

	// Post login
	app.post('/login', function (req, res, next) {
		// you might like to do a database look-up or something more scalable here
		// if (req.body.username && req.body.username === 'user' && req.body.password && req.body.password === 'pass') {
		// 	req.session.authenticated = true;
		// 	res.redirect('/secure');
		// } else {
		// 	req.flash('error', 'Username and password are incorrect');
		// 	res.redirect('/login');
		// }
		// console.log(req.body.username);
		// console.log(req.body.password);
		// if (req.body.username && req.body.username === 'user' && req.body.password && req.body.password === 'pass') {
    //
		// 	req.session.authenticated = true;
		// 	res.redirect('/secure');
		// } else {
		// 	req.flash('error', 'Username and password are incorrect');
		// 	res.redirect('/login');
		// }
		knex('users').where({
			username:req.body.username,
			password:req.body.password
		})
		.then(function(response) {
			// TODO: Use middleware function to check for response null
			// For now just check if the response if null
			if (response !== undefined) {
				if (response[0].username === req.body.username && response[0].password === req.body.password) {
					console.log("AUTHENTICATED");
					req.session.authenticated = true;
					res.redirect('/secure');
				} else {
					req.flash('error', 'Username and password are incorrect');
					res.redirect('/login');
				}
			} else {
					req.flash('error', 'Username and password are incorrect');
					res.redirect('/login');
			}

		})
		.catch(function(error) {
			console.log("You're an absolute BELLEND");
			// req.session.authenticated = false;
			req.flash('error', 'Username and password are incorrect');
			res.redirect('/login');
		});
	});

	app.get('/logout', function (req, res, next) {
		delete req.session.authenticated;
		res.redirect('/');
	});

	// NEW ROUTES
	// //  a get requests that retrieves all the users
	// app.get('/users', (request, response) =>{
	//     knex.select().table('users')
	//     .then(function(results){response.send(results)});
	// });
  //
	// // a post request that adds new user to the database
	// app.post('/users/', (request, response) =>{
	//     knex('users').insert(request.body).then(function(id){
	//         knex('users').where({id:id[0]}).then(results=>{response.send(results[0])});
	//     });
	// });
  //
	// //  gets the user account of the username with the proper username and password passed into it.
	// app.get('/users/:username/:password', (request, response) => {
	//     knex('users').where({
	//       'username': request.params.username,
	//       'password': request.params.password
	//     })
	//     .then(function(results) {
	//         response.send(results)
	//     });
	// });


};
