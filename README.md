
## Quick Start
This package is an easy-to-use npm module that'll easily allow you to create modules for accelerated.api, extending our module class so that when we roll updates out, you're code base is preserved and can gracefully update.

Here's a quick step-by-step:

1. ```npm install accelerated.api.module --save``` in your node.js project;

2. The goal here is to modularize your project into various aspects. For instance, you might be writing a ```users``` model with full CRUD API capatabilities. In this example, you would want to create a folder ```apiUsers``` in your project directory and create an ```index.js```, so your project structure now looks like:

```

/project
	|__ /apiUsers
		|__ /index.js
	|__ /index.js

```

3. Go ahead and start with the following code in ```/apiUsers/index.js```. Note the visible accelerated methods that are being called to extend the module's ```middleware```, ```model```, and ```routes```:

```
module.exports = (function() {

	// you can require this or other modules using accelerated.api.module 
	var apiUsers = require('accelerated.api.module');

	// set your module's key for reference by middlwares, models, and routes 
	apiUsers.setKey('users');

	// set your module's name for logging output 
	apiUsers.setName('Users Module');

	// you can choose to extend your module's model
	apiUsers.extendModel(function(model, express, app, models) {

		// modify model to include user create, retrieve, update, and delete methods
		return model;

	});

	// you can choose to extend your module's middleware 
	apiUsers.appendMiddleware(function(express, app, models) {

		// modify app to include user authentication middleware 
		return app;

	});

	// you can choose to extend your module's routes
	apiUsers.appendRoute(function(express, app, models) {
		
		// modify app to include user CRUD routes 
		return app;

	});

	return apiUsers;

})();
```

4. Require and use your newly created module within your accelerated project. Go ahead and use the following code in ```/index.js```

```
var api = require('accelerated.api');
var apiUsers = require('./apiUsers');

api.useMiddlewares([ 
	[apiUsers.key, apiUsers.middleware]
]);

api.useModels([
	[apiUsers.key, apiUsers.model]
]);

api.useRoutes([
	[apiUsers.key, apiUsers.route]
]);

api.run();
```

Viola! You now have a highly-organized, highly-efficient, fully-logging node.js express app, with decoupled data logic that's abstracted just right.

