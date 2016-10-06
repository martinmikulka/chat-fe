#Synopsis
This is simple chat application. Used technologies: HTML, jQuery, LESS, Node.js, Express framework, Grunt.

#Motivation
This project is purely for job application purposes. There is almost 100% chance, that this project will not be maintained in the future.

#Installation
1. Clone repository
2. Setup config
3. Run application `node app.js`

#Project description

##FE

To be able to access chat application, user has to login. Username and password are required. If user does not have account yet, he can register a new one.

###Javascript core

**/public/src/js/app.js**

This is App namespace, where generic functions are located.

**/public/src/js/ctrl/\*.js**

These are FE Controllers. Each view has it's own controller.

###Layout and partial templates

When user requests Homepage (URL: /), a complete layout is returned from server and rendered. All other requested resources (URL: /registration, /login, /chat) return only partial HTML templates, which are inserted into layout's #Main container by jQuery. Requests are realised by AJAX. [Handlebars](https://www.npmjs.com/package/express-handlebars) templating engine is used.

**/views/layout/main.hbs**

This is very basic main layout.

**/views/\*.hbs**

These are partial templates. Each view has it's own partial template.

###Login and Registration

Both forms share the same concept. On submit, AJAX request is sent to the server and JSON response is expected. Data validation is performed on the server. Details of the server implementation are mentioned in BE part below. If any errors occur, these are returned in the response and displayed at appropriate place in the form. On success, a new view is loaded.

###Chat

After successful login (or registration) the Chat application is displayed. Chat application occupies whole document's height. Height is calculated by javascript on Chat initialisation and is also recalculated on window resize. Messages are displayed at the bottom of the Chat window, when maximum height is reached, vertical scrollbar appears. Chat window scrolls automatically on user's (local) message. On message from other users, Chat window remains at the same position, so user can easily see missed messages. Chat application can be closed, user gets logged out on this action.

###Grunt

There is a [Grunt](http://gruntjs.com/) installed with tools for LESS to CSS conversion, CSS and JS minification and a watcher.

##Server

###Configuration

**/config/config.dev.js**

It is necessary to set API hostname and authorization key.

###Main Application

**/app.js**

The [Express](https://www.npmjs.com/package/express) framework is used for server implementation. The Chat communication is based on Websockets, the [Socket.io](http://socket.io/) library is used.

###User Controller

**/routes/user.js**

There is dedicated router for user related actions. Router calls methods from the user controller.

**/controllers/user.js**

####Login and Registration

Both actions share the same concept. At first, the basic user input validation is performed. If input passes the validation, the new http.request is set up and sent to the [API](https://github.com/martinmikulka/chat-be). When complete response from API is received, it is parsed and processed. Then the response for FE is set and returned.
