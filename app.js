
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

// TODO: Replace this in a config file
var port = 8999;

// Creates the express server
var app = express.createServer();

// Check the auth of the routes => middleware functions
function checkAuth (req, res, next) {
	console.log('checkAuth ' + req.url);
	// don't serve /secure to those not logged in => /secure if for those who are logged in
	// you should add to this list, for each and every secure url
	if (req.url.indexOf("/secure")=== 0 && (!req.session || !req.session.authenticated)) {
		res.render('unauthorised', { status: 403 });
		return;
	}
	next();
}

// Requires all the middleware functions
app.configure(function () {

	app.use(express.static(path.join(__dirname, '/views')));
	// app.use(express.static(__dirname + '/views'));
	// Error Handline Middleware => Could make it more robust
	app.use(function (err, req, res, next) {
	  console.error(err.stack);
	  res.status(500).send('Something broke!');
	})
	app.use(express.cookieParser());
	app.use(express.session({ secret: 'example' }));
	app.use(express.bodyParser());
	// Middleware function to checkAuth functionality
	app.use(checkAuth);
	app.use(app.router);
	// app.set('view engine', 'html');
	app.set('view engine', 'pug');
	// app.set('view engine', 'html');
	app.set('view options', { layout: false });

});

// Requires our external routes.js library => which contains all our routes
require('./lib/routes.js')(app);

app.listen(port);
console.log('Node listening on port %s', port);
