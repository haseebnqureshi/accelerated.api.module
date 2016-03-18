module.exports = function() {

	this.middleware = {};

	/*
	This callback is meant as a filter to your middleware, making any changes to 
	your middleware and then returning back for use by accelerated. 

	This is the default callback. Having it attached to this module.exports
	allows for inheritance and providing for overrides, that are decoupled 
	cleanly between application and accelerated logic.
	*/

	this.extendCallback = function(middleware, express, app, models) {
		return middleware;
	};

	/*
	This callback allows for mere appending middleware. This occurs after any 
	middleware is extended. (In the case of adding multiple middleware,
	everything would get called against app within this one accelerated 
	callback.)
	*/

	this.appendCallback = function(express, app, models) {
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

		middleware = this.extendCallback(middleware, express, app, models);

		/*
		Then we append any middlewares that we've specified, via 
		appendCallback.
		*/

		app = this.appendCallback(express, app, models);

		/*
		Returning app for waterfalling.
		*/

		return app;
	};

};