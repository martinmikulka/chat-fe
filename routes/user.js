var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();

var parser = bodyParser.urlencoded({extended: false});
var user = require('../controllers/user');

router.post('/', parser, user.register);
router.post('/login', parser, user.login);

module.exports = router;
