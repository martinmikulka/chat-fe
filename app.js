var express = require('express');
var exphbs  = require('express-handlebars');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static('public'));

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: 'hbs' }));
app.set('view engine', 'hbs');


/**
 * Routes
 */
var user = require('./routes/user');
app.use('/user', user);

app.get('/', function (req, res) {
	res.render('index');
});
app.get('/chat', function (req, res) {
	res.render('chat');
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
