var App = App || {};
App.Ctrl = App.Ctrl || {};

App.Ctrl.Registration = function () {
	this.formRegistration = $('#FormRegistration');
	this.formRegistration.on('submit', this.registrationSubmit.bind(this));

	this.btnLogin = $('#BtnLogin');
	this.btnLogin.on('click', function () { return App.loadPage('/chat'); });
};

App.Ctrl.Registration.prototype.registrationSubmit = function (ev) {
	var url = this.formRegistration.attr('action') || '/user/register';
	var method = this.formRegistration.attr('method') || 'post';
	$.ajax({
		url: url,
		method: method,
		data: this.formRegistration.serialize(),
		datatype: 'json',
		success: this.registrationSuccess.bind(this),
		error: this.registrationError
	});
	return false;
};

App.Ctrl.Registration.prototype.registrationSuccess = function (data, status, xhr) {
	App.cleanFormErrors(this.formRegistration);
	data = JSON.parse(data);
	if (data.errors.length) {
		if (data.errors.indexOf('E_USERNAME_EMPTY') !== -1) {
			this.formRegistration.find('label[for="FormRegistrationUsername"] .errmsg').append('<p>Username is empty.</p>');
		}
		if (data.errors.indexOf('E_PASSWORD_EMPTY') !== -1) {
			this.formRegistration.find('label[for="FormRegistrationPassword"] .errmsg').append('<p>Password is empty.</p>');
		}
		if (data.errors.indexOf('E_PASSWORD_CONFIRM_EMPTY') !== -1) {
			this.formRegistration.find('label[for="FormRegistrationPasswordConfirm"] .errmsg').append('<p>Password confirmation is empty.</p>');
		}
		if (data.errors.indexOf('E_PASSWORD_MISMATCH') !== -1) {
			this.formRegistration.find('label[for="FormRegistrationPasswordConfirm"] .errmsg').append('<p>Password confirmation does not match password.</p>');
		}
		if (data.errors.indexOf('E_USERNAME_EXISTS') !== -1) {
			this.formRegistration.children('.errmsg').append('<p>Account already exists. Please choose different username.</p>');
		}
	} else {
		App.loadPage('/chat');
	}
};

App.Ctrl.Registration.prototype.registrationError = function (xhr, status, error) {
	App.flashMessage('Error occured when calling registration service. Sorry.', 'error');
};
