var App = App || {};
App.Ctrl = App.Ctrl || {};

App.Ctrl.Chat = function (opts) {
	this.socket;
	this.elements;
	this.init(opts);
};

App.Ctrl.Chat.prototype.init = function (opts) {
	this.socket = io();
	this.socket.on('chat_message', this.displayMessage.bind(this));

	this.elements = {
		container: $('#' + opts.container),
		window: $('<div id="ChatWindow"></div>'),
		input: $('<form id="ChatInput" autocomplete="off"><input type="text" name="message" /></form>')
	};

	this.elements.container
		.append(this.elements.window)
		.append(this.elements.input);

	this.elements.input.on('submit', this.sendMessage.bind(this));
	this.elements.input.find('[name="message"]').get(0).focus();
};

App.Ctrl.Chat.prototype.sendMessage = function (ev) {
	var $input = this.elements.input.find('[name="message"]');
	this.socket.emit('chat_message', $input.val());
	this.displayMessage($input.val(), true);
	$input.val('');
	return false;
};

App.Ctrl.Chat.prototype.displayMessage = function (message, local) {
	message = message.replace(/\:(-)?\)/g, '<img src="/img/smile.png" />');
	$('<p>' + message + '</p>')
		.addClass('message')
		.addClass(local ? 'local' : 'public')
		.appendTo(this.elements.window);
};
