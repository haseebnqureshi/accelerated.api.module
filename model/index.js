module.exports = function() {

	this.model = {};

	/*
	This callback is meant as a filter to your model, making any changes to 
	your model and then returning back for use by accelerated. 

	This is the default callback. Having it attached to this module.exports
	allows for inheritance and providing for overrides, that are decoupled 
	cleanly between application and accelerated logic.
	*/

	this.extendCallback = function(model, express, app, models) {
		return model;
	};

	/* 
	This gets invoked by accelerated, and has the effect of filling 
	accelerated's pipes with the needed data objects, at time of execution.
	*/

	this.use = function(express, app, models) {

		var model = this.model;

		/*
		No matter what, our model goes through our extendCallback filtering
		allowing any manipulations to occur before retrieving the final 
		model object for accelerated's use.
		*/

		model = this.extendCallback(model, express, app, models);

		/* 
		Sending our resulting model back to accelerated.
		*/

		return model;
	};

};