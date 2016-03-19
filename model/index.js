module.exports = function(settings) {

	var settings = settings || {};

	this.model = {};

	/*
	This callback is meant as a filter to your model, making any changes to 
	your model and then returning back for use by accelerated. We check for 
	any extendModel callback and conditionally use our default callback. 
	This cleanly decouples application logic from accelerated logic.
	*/

	this.extendCallback = settings.extendModel || function(model, express, app, models, settings) {
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

		model = this.extendCallback(model, express, app, models, settings);

		/* 
		Sending our resulting model back to accelerated.
		*/

		return model;
	};

};