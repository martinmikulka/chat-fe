var App = App || {};

App.loadPage = function (url) {
	$.ajax({
		url: url,
		method: 'get',
		success: App.loadPageSuccess,
		error: App.loadPageError
	});
	return false;
};

App.loadPageSuccess = function (res, status, xhr) {
	$('#Main').fadeOut(300, function () {
		$(this)
			.empty()
			.append(res)
			.fadeIn(300);
	});
};

App.loadPageError = function () {
	App.flashMessage('Sorry, requested page was not found.', 'error');
};

App.flashMessage = function (msg, type) {
	type = type || 'info';

	var flash = $('<span>' + msg + '</span>')
		.css('display', 'none')
		.addClass('flash-message')
		.addClass(type);

	$('body').append(flash);

	var delay = 1000 * (msg.length / 25);
	flash.fadeIn(300, function () {
		setTimeout(function () {
			flash.fadeOut(300);
		}, delay);
	});
};
