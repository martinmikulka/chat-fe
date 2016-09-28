var express = require('express');
var http = require('http');

var Ctrl = {};

/**
 * Return common options for API calls.
 */
Ctrl._getCommonApiOptions = function () {
	return {
		hostname: 'www.chatbe.dev', // TODO put into some config
		headers: {
			'Content-Type': 'application/json',
			'Authorization': 'chatbe_mp2nXGw3HZNAYS3b' // TODO put into some config
		}
	};
};

/**
 * Perform user login
 */
Ctrl.login = function (req, res) {
	var options = Ctrl._getCommonApiOptions();
	options.path = '/user/login';
	options.method = 'POST';

	var request = http.request(options, function (response) {
		var body = '';
		response.on('data', function (data) {
			body += data;
		});
		response.on('end', function () {
			res.json(body);
		});
	});

	var data = {
		username: req.body.username,
		password: req.body.password
	};

	request.write(JSON.stringify(data));
	request.end();
};


/**
 * Perform user registration
 */
Ctrl.register = function (req, res) {
	console.log('Ctrl.register called');
	res.send('text');
};

module.exports = Ctrl;
