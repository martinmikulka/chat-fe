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

Ctrl._apiRequest = function (data, options, cb) {
	var request = http.request(options, function (response) {
		var body = '';
		response.on('data', function (data) {
			body += data;
		});
		response.on('end', function () {
			body = JSON.parse(body);
			return cb(body);
		});
	});

	request.write(JSON.stringify(data));
	request.end();

};

/**
 * Perform user login
 */
Ctrl.login = function (req, res) {
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

	var options = Ctrl._getCommonApiOptions();
	options.path = '/user/login';
	options.method = 'POST';

	var data = {
		username: req.body.username,
		password: req.body.password
	};

	Ctrl._apiRequest(data, options, function (response) {
		if (response.errors) {
			out.errors = response.errors;
		} else {
			req.session.loggedUserId = response.data.id;
		}
		res.end(JSON.stringify(out));
	});
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
	if (!req.body.password_confirm) {
		out.errors.push('E_PASSWORD_CONFIRM_EMPTY');
	}
	if (req.body.password && req.body.password_confirm && req.body.password != req.body.password_confirm) {
		out.errors.push('E_PASSWORD_MISMATCH');
	}
	if (out.errors.length) {
		res.end(JSON.stringify(out));
		return;
	}

	var options = Ctrl._getCommonApiOptions();
	options.path = '/user';
	options.method = 'POST';

	var data = {
		username: req.body.username,
		password: req.body.password,
		password_confirm: req.body.password_confirm
	};

	Ctrl._apiRequest(data, options, function (response) {
		if (response.errors) {
			out.errors = response.errors;
		} else {
			req.session.loggedUserId = response.data.id;
		}

		res.end(JSON.stringify(out));
	});
};

module.exports = Ctrl;
