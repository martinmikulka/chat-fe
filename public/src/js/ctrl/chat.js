var App = App || {};
App.Ctrl = App.Ctrl || {};

App.Ctrl.Chat = function (opts) {
	this.socket;
	this.elements;
	this.init(opts);

	this.btnLogout = $('#BtnLogout');
	this.btnLogout.on('click', this.logoutSubmit.bind(this));

	this.resizeTimer;
	$(window).on('resize', this.resizeHandler.bind(this));
};

App.Ctrl.Chat.prototype.logoutSubmit = function () {
	$.ajax({
		url: '/user/logout',
		method: 'get',
		success: this.logoutSuccess.bind(this),
		error: this.logoutError.bind(this)
	});
	return false;
};

App.Ctrl.Chat.prototype.logoutSuccess = function (data, status, xhr) {
	$('#Main').load('/');
};

App.Ctrl.Chat.prototype.logoutError = function (xhr, status, error) {
	console.log(status);
	console.log(error);
};

App.Ctrl.Chat.prototype.init = function (opts) {
	this.socket = io();
	this.socket.on('chat_message', this.displayMessage.bind(this));

	if (!(opts && opts.container)) {
		return console.error('Chat container DOM identifier not specified.');
	}

	var container = $('#' + opts.container);
	if (!container.length) {
		return console.error('Chat container does not exist in DOM. Create element with id=' + opts.container + '.');
	}

	this.elements = {
		container: container,
		window: $('<div id="ChatWindow"></div>'),
		input: $('<form id="ChatInput" autocomplete="off"><input type="text" name="message" /></form>')
	};

	this.elements.container
		.append(this.elements.window)
		.append(this.elements.input);

	this.calculateHeights();

	this.elements.input.on('submit', this.sendMessage.bind(this));
	this.elements.input.find('[name="message"]').get(0).focus();
};

App.Ctrl.Chat.prototype.sendMessage = function (ev) {
	var $input = this.elements.input.find('[name="message"]');
	if ($input.val()) {
		this.socket.emit('chat_message', $input.val());
		this.displayMessage($input.val(), true);
		$input.val('');
		// scroll chat window down to maximum only after own message
		this.elements.window.scrollTop(this.elements.window.height());
	}
	return false;
};

App.Ctrl.Chat.prototype.displayMessage = function (message, local) {
	message = message.replace(/\:(-)?\)/g, '<img src="/img/smile.png" />');
	$('<div></div>')
		.addClass('message-box')
		.addClass(local ? 'local' : 'public')
		.append('<span class="message">' + message + '</span>')
		.appendTo(this.elements.window);
};

App.Ctrl.Chat.prototype.resizeHandler = function () {
	clearTimeout(this.resizeTimer);
	this.resizeTimer = setTimeout(this.calculateHeights.bind(this), 100);
}

App.Ctrl.Chat.prototype.calculateHeights = function () {
	// reset container height first to be able to calculate new document height properly
	this.elements.container
		.css('height', 0)
		.css('height', $(document).height());
	this.elements.window
		.css('max-height', this.elements.container.outerHeight() - this.elements.input.outerHeight())
		.css('bottom', 40);
};
