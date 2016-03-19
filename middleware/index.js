module.exports = function(settings) {

	var settings = settings || {};

	this.middleware = {};

	/*	
	This callback is meant as a filter to your middleware, making any changes to 
	your middleware and then returning back for use by accelerated. We check for 
	any extendMiddleware callback and conditionally use our default callback. 
	This cleanly decouples application logic from accelerated logic.
	*/

	this.extendCallback = settings.extendMiddleware || function(middleware, express, app, models, settings) {
		return middleware;
	};

	/*
	This callback allows for mere appending middleware. This occurs after any 
	middleware is extended. (In the case of adding multiple middleware,
	everything would get called against app within this one accelerated 
	callback.)
	*/

	this.appendCallback = settings.appendMiddleware || function(express, app, models, settings) {
		return app;		
	};

	/* 
	This gets invoked by accelerated, and has the effect of filling 
	accelerated's pipes with the needed data objects, at time of execution.
	*/

	this.use = function(express, app, models) {

		var middleware = this.middleware;

		/*
		No matter what, our model goes through our extendCallback filtering
		allowing any manipulations to occur before retrieving the final 
		model object for accelerated's use.
		*/

		middleware = this.extendCallback(middleware, express, app, models, settings);

		/*
		Then we append any middlewares that we've specified, via 
		appendCallback.
		*/

		app = this.appendCallback(express, app, models, settings);

		/*
		Returning app for waterfalling.
		*/

		return app;
	};

};