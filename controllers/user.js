var express = require('express');

var Ctrl = {};

/**
 * Perform user login
 */
Ctrl.login = function (req, res) {
	console.log('Ctrl.login called');
	res.send('text');
};

/**
 * Perform user registration
 */
Ctrl.register = function (req, res) {
	console.log('Ctrl.register called');
	res.send('text');
};

module.exports = Ctrl;
