var express = require('express');
var exphbs  = require('express-handlebars');
var session = require('express-session');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);


/**
 * Rendering options middleware
 */
var renderOptions = function (req, res, next) {
	req.renderOptions = {};

	// Disable rendering of layout for XMLHttpRequest
	if (req.xhr) {
		req.renderOptions.layout = false;
	}

	next();
}
app.use(renderOptions);


/**
 * Setup sessions
 */
app.use(session({
	name: 'sessionId',
	resave: false,
	saveUninitialized: false,
	secret: 'X3CcH9'
}));


/**
 * Setup templating engine
 */
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: 'hbs' }));
app.set('view engine', 'hbs');


/**
 * Routes
 */
app.use(express.static('public/dist'));

var user = require('./routes/user');
app.use('/user', user);

app.get('/', function (req, res) {
	if (req.session.loggedUserId) {
		res.render('chat', req.renderOptions);
	} else {
		res.render('index', req.renderOptions);
	}
});
app.get('/registration', function (req, res) {
	res.render('registration', req.renderOptions);
});


/**
 * Socket.io related functionality
 */
io.on('connection', function (socket) {
	socket.on('chat_message', function (message) {
		socket.broadcast.emit('chat_message', message);
	});
});


/**
 * Create server
 */
http.listen(3000, function () {
	console.log('Server is listening on port 3000.');
});
