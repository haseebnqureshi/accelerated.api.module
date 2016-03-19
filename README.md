
## About
This package is an easy-to-use npm module that'll easily allow you to create modules for accelerated.api, extending our module class so that when we roll updates out, you're code base is preserved and can gracefully update.

## Accelerated Strategy
The overall strategy behind accelerated is creating a series of well built modules that act as your application's plumbing. Using CommonJS modules to build all of your code "pipes", we're able to extend or modify them until they're used. Using callbacks, object inheritance, and well-defined scopes, accelerated's module base can be extend any number of times.

What's great about this strategy, is that if you have a great authentication accelerated module but need to tweak something minor for your application. Instead of cloning the entire auth codebase, you can instead require its CommonJS module, and then extend the settings per accelerated's public api, so that you're only writing the difference in code, and not the entire auth module.

Now when your pipes have been fully built for your application, you can then fill your modules with instantiated code. It's at this moment where accelerated connects your modules and ensures there aren't any inheritance or dependency issues between your modules.

## Get Started
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
module.exports = (function() {

	//loading accelerated's module with your appropriate settings
	var module = new require('accelerated.api.module')({

		//set your module's key for reference by middlwares, models, and routes 
		key: 'users',

		//set your module's name for logging output 
		name: 'Users Module',
	
		//you can choose to extend your module's model
		extendModel: function(model, express, app, models) {

			//modify model to include user create, retrieve, update, and delete methods
			return model;

		},
	
		//you can choose to extend your module's middleware 
		appendMiddleware: function(express, app, models) {

			//modify app to include user authentication middleware 
			return app;

		},
	
		//you can choose to extend your module's routes
		appendRoute: function(express, app, models) {
			
			//modify app to include user CRUD routes 
			return app;

		}
	
	});

	//returning for use by accelerated.api
	return module;

})();
```

Go ahead and use the following code in ```/index.js```, requiring and using your newly created module within your accelerated project:

```
var api = require('accelerated.api');
var module = require('./module').use();

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

## Extending Your Custom Module
Let's say you want to extend your custom module. Go ahead and create a new folder and ```index.js``` so that your project directory now looks like:

```
/project
	|__ /index.js
	|__ /module
		|__ /index.js
	|__ /extendedModule
		|__ /index.js

```

Next, let's reference your original ```module``` and then extend ```module``` with the following code. This will go into ```/extendedModule/index.js```:

```
module.exports = (function() {

    var module = new require('../module');

    module.setSettings({
        key: 'members',
        name: 'Members Module'

        /* You can choose to extend your middleware, model, and route here, too. */

    });

    return module;

})();
```

Now that your ```extendedModule``` has been written, let's use it. Go to your project's ```/index.js``` and add your ```extendedModule``` dependencies, so that your ```/index.js``` now looks like:

```
var api = require('accelerated.api');
var module = require('./module').use();
var extendedModule = require('./extendedModule').use();

api.useMiddlewares([ 
	[module.key, module.middleware],
	[extendedModule.key, extendedModule.middleware]
]);

api.useModels([
	[module.key, module.model],
	[extendedModule.key, extendedModule.model]
]);

api.useRoutes([
	[module.key, module.route],
	[extendedModule.key, extendedModule.route]
]);

api.run();
```

Viola! You've now extended your accelerated module, writing the least amount of code to make your next great appilciation, fully abstracted and highly organized.

