module.exports = (function() {

	var middleware = require('./middleware');

	var model = require('./model');

	var route = require('./route');

	var module = {

		key: 'baseModule',

		name: 'Base Module',

		middleware: new middleware(),

		model: new model(),

		route: new route()
	
	};

	return require('./extend.js')(module);

})();