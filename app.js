var express = require('express');
var exphbs  = require('express-handlebars');
var app = express();

app.use(express.static('public'));

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: 'hbs' }));
app.set('view engine', 'hbs');

var user = require('./routes/user');
app.use('/user', user);

app.get('/', function (req, res) {
	res.render('index');
});
app.get('/chat', function (req, res) {
	res.render('chat');
});



app.listen(3000, function () {
	console.log('Server is listening on port 3000.');
});
