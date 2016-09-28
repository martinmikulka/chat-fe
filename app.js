var express = require('express');
var app = express();

app.use(express.static('public'));

var user = require('./routes/user');
app.use('/user', user);

app.get('/', function (req, res) {
	res.sendFile(__dirname + '/index.html');
});



app.listen(3000, function () {
	console.log('Server is listening on port 3000.');
});
