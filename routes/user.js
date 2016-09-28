var express = require('express');
var router = express.Router();

var user = require('../controllers/user');

router.post('/', user.register);
router.post('/login', user.login);

module.exports = router;
