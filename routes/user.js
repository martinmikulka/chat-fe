var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();

var parser = bodyParser.urlencoded({extended: false});
var user = require('../controllers/user');

router.post('/login', parser, user.login);
router.post('/register', parser, user.register);
router.get('/logout', user.logout);

module.exports = router;
