var express = require('express');
var exphbs  = require('express-handlebars');
var session = require('express-session');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);


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
app.use(express.static('public'));

var user = require('./routes/user');
app.use('/user', user);

app.get('/', function (req, res) {
	if (req.session.loggedUserId) {
		res.render('chat');
	} else {
		res.render('index');
	}
});
app.get('/chat', function (req, res) {
	res.render('chat');
});
app.get('/registration', function (req, res) {
	res.render('registration');
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
