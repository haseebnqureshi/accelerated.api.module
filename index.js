
/*
Remember, any use of this must instantiate a new instance, so 
that requiring this package, multiple times in a project, does not
lead into scope confusion, and that each instance is truly separate.

This must be used by: 
var module = new require('accelerated.api.module')();
*/

module.exports = function() {

	var middleware = require('./middleware');

	var model = require('./model');

	var route = require('./route');

	return {

		key: 'baseModule',

		name: 'Base Module',

		middleware: new middleware(),

		model: new model(),

		route: new route(),
	
		appendMiddleware: function(appendCallback) {
			this.middleware.appendCallback = appendCallback;
		},

		appendRoute: function(appendCallback) {
			this.route.appendCallback = appendCallback;
		},

		extendMiddleware: function(extendCallback) {
			this.middleware.extendCallback = extendCallback;
		},

		extendModel: function(extendCallback) {
			this.model.extendCallback = extendCallback;
		},

		extendRoute: function(extendCallback) {
			this.route.extendCallback = extendCallback;
		},

		setKey: function(key) {
			this.key = key;
		},

		setName: function(name) {
			this.name = name;
		}

	};

};