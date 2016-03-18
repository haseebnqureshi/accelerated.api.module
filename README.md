
## Quick Start
This package is an easy-to-use npm module that'll easily allow you to create modules for accelerated.api, extending our module class so that when we roll updates out, you're code base is preserved and can gracefully update.

First, ```npm install accelerated.api.module --save``` in your node.js project.

The goal here is to modularize your project into various aspects. For instance, you might be writing a ```users``` model with full CRUD API capatabilities. In this example, you would want to create a folder ```module``` in your project directory and create an ```index.js```, so your project structure now looks like:

```

/project
	|__ /index.js
	|__ /module
		|__ /index.js

```

Now go ahead and start with the following code in ```/module/index.js```. Note the visible accelerated methods that are being called to extend the module's ```middleware```, ```model```, and ```routes```:

```
module.exports = function() {

	// you can require this or other modules using accelerated.api.module 
	var module = new require('accelerated.api.module')();

	// set your module's key for reference by middlwares, models, and routes 
	module.setKey('users');

	// set your module's name for logging output 
	module.setName('Users Module');

	// you can choose to extend your module's model
	module.extendModel(function(model, express, app, models) {

		// modify model to include user create, retrieve, update, and delete methods
		return model;

	});

	// you can choose to extend your module's middleware 
	module.appendMiddleware(function(express, app, models) {

		// modify app to include user authentication middleware 
		return app;

	});

	// you can choose to extend your module's routes
	module.appendRoute(function(express, app, models) {
		
		// modify app to include user CRUD routes 
		return app;

	});

	return module;

};
```

Go ahead and use the following code in ```/index.js```, requiring and using your newly created module within your accelerated project:

```
var api = require('accelerated.api');
var module = new require('./module')();

api.useMiddlewares([ 
	[module.key, module.middleware]
]);

api.useModels([
	[module.key, module.model]
]);

api.useRoutes([
	[module.key, module.route]
]);

api.run();
```

Viola! You now have a highly-organized, highly-efficient, fully-logging node.js express app, with decoupled data logic that's abstracted just right.

