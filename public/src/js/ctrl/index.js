var App = App || {};
App.Ctrl = App.Ctrl || {};

App.Ctrl.Index = function () {
	this.formLogin = $('#FormLogin');
	this.formLogin.on('submit', this.loginSubmit.bind(this));

	this.btnRegistration = $('#BtnRegistration');
	this.btnRegistration.on('click', function () { return App.loadPage('/registration'); });
};

App.Ctrl.Index.prototype.loginSubmit = function (ev) {
	var url = this.formLogin.attr('action') || '/user/login';
	var method = this.formLogin.attr('method') || 'post';
	$.ajax({
		url: url,
		method: method,
		data: this.formLogin.serialize(),
		datatype: 'json',
		success: this.loginSuccess.bind(this),
		error: this.loginError
	});
	return false;
};

App.Ctrl.Index.prototype.loginSuccess = function (data, status, xhr) {
	App.cleanFormErrors(this.formLogin);
	data = JSON.parse(data);
	if (data.errors.length) {
		if (data.errors.indexOf('E_USERNAME_EMPTY') !== -1) {
			this.formLogin.find('label[for="FormLoginUsername"] .errmsg').append('<p>Username is empty.</p>');
		}
		if (data.errors.indexOf('E_PASSWORD_EMPTY') !== -1) {
			this.formLogin.find('label[for="FormLoginPassword"] .errmsg').append('<p>Password is empty.</p>');
		}
		if (data.errors.indexOf('E_USER_ACCOUNT_DOES_NOT_EXIST') !== -1) {
			this.formLogin.children('.errmsg').append('<p>User account does not exist.</p>');
		} else if (data.errors.indexOf('E_AUTHENTICATION_FAILED') !== -1) {
			this.formLogin.children('.errmsg').append('<p>Incorrect password.</p>');
		}
	} else {
		App.loadPage('/chat');
	}
};

App.Ctrl.Index.prototype.loginError = function (xhr, status, error) {
	App.flashMessage('Error occured when calling login service. Sorry.', 'error');
};
