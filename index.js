
/*
The goal here is to pass settings into this object, so that when
the pipes have been fully built, "use" can then fill the JS pipes
with intantiations.
*/

module.exports = function(settings) {

	var public = {};

	var that = this;

	var _ = require('underscore');

	/*
	Absorb the constructed settings in a safe and consistent
	way, persisting them to this scope.
	*/

	public.setSettings = function(settings) {
	
		//ensure we have some settings into our public scope
		public.settings = public.settings || {};

		/*
		Then ensuring we "absorb" our settings by extending 
		public.settings with our overrides.
		*/

		public.settings = _.extend(public.settings, settings);

	};

	/*
	Call this, only when you want to lock down the object, and 
	inheritance	is finished. This returns the appropriate objects
	to use in accelerated.api.
	*/

	public.use = function() {

		var middleware = require('./middleware');

		var model = require('./model');

		var route = require('./route');

		var module = {

			key: public.settings.key || 'baseModule',

			name: public.settings.name || 'Base Module',

			middleware: new middleware(public.settings),

			model: new model(public.settings),

			route: new route(public.settings)

		};

		return module;

	};

	public.setSettings(settings);

	return public;

};