module.exports = function(module) {

	module.appendMiddleware = function(appendCallback) {
		module.middleware.appendCallback = appendCallback;
	};

	module.appendRoute = function(appendCallback) {
		module.route.appendCallback = appendCallback;
	};

	module.extendMiddleware = function(extendCallback) {
		module.middleware.extendCallback = extendCallback;
	};

	module.extendModel = function(extendCallback) {
		module.model.extendCallback = extendCallback;
	};

	module.extendRoute = function(extendCallback) {
		module.route.extendCallback = extendCallback;
	};

	module.setKey = function(key) {
		module.key = key;
	};

	module.setName = function(name) {
		module.name = name;
	};

	return module;

};