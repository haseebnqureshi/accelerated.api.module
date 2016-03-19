module.exports = function(settings) {

	var settings = settings || {};

	this.route = {};

	/*
	This callback is meant as a filter to your route, making any changes to 
	your route and then returning back for use by accelerated. We check for 
	any extendRoute callback and conditionally use our default callback. 
	This cleanly decouples application logic from accelerated logic.
	*/

	this.extendCallback = settings.extendRoute || function(route, express, app, models, settings) {
		return route;
	};

	/*
	This callback allows for mere appending route. This occurs after any 
	route is extended. (In the case of adding multiple routes,
	everything would get called against app within this one accelerated 
	callback.)
	*/

	this.appendCallback = settings.appendRoute || function(express, app, models, settings) {
		return app;		
	};

	/* 
	This gets invoked by accelerated, and has the effect of filling 
	accelerated's pipes with the needed data objects, at time of execution.
	*/

	this.use = function(express, app, models) {

		var route = this.route;

		/*
		No matter what, our model goes through our extendCallback filtering
		allowing any manipulations to occur before retrieving the final 
		model object for accelerated's use.
		*/

		route = this.extendCallback(route, express, app, models, settings);

		/*
		Then we append any routes that we've specified, via appendCallback.
		*/

		app = this.appendCallback(express, app, models, settings);

		/*
		Returning app for waterfalling.
		*/

		return app;
	};

};