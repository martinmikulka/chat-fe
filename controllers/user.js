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

	var out = {
		errors: []
	};

	/**
	 * User input validation
	 */
	if (!req.body.username) {
		out.errors.push('E_USERNAME_EMPTY');
	}
	if (!req.body.password) {
		out.errors.push('E_PASSWORD_EMPTY');
	}
	if (out.errors.length) {
		res.end(JSON.stringify(out));
		return;
	}

	var request = http.request(options, function (response) {
		var body = '';
		response.on('data', function (data) {
			body += data;
		});
		response.on('end', function () {
			body = JSON.parse(body);
			if (body.errors) {
				out.errors = body.errors;
			} else {
				req.session.loggedUserId = body.data.id;
			}

			res.end(JSON.stringify(out));
			return;
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
 * Perform user logout
 */
Ctrl.logout = function (req, res) {
	req.session.destroy();
	res.end();
};


/**
 * Perform user registration
 */
Ctrl.register = function (req, res) {
	console.log('Ctrl.register called');
	res.send('text');
};

module.exports = Ctrl;
