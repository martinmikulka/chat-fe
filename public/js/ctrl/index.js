var App = App || {};
App.Ctrl = App.Ctrl || {};

App.Ctrl.Index = function () {
	this.formLogin = $('#FormLogin');
	this.formLogin.on('submit', this.login.bind(this));
};

App.Ctrl.Index.prototype.login = function (ev) {
	var url = this.formLogin.attr('action') || '/';
	var method = this.formLogin.attr('method') || 'get';
	$.ajax({
		url: url,
		method: method,
		data: this.formLogin.serialize(),
		success: function () {},
		error: function () {}
	});
	return false;
}
