## Balance Projector – an Angular.js learning project

Balance Projector can provide quick insights into your immediate financial future. The real time interface updates on every change and makes somewhat abstract numbers very tangible.

You can see a working version of it at: [http://daaain.github.com/projector/app/index.html](http://daaain.github.com/projector/app/index.html)

Built with:

* [Google AngularJS](http://angularjs.org/)
* [Twitter Bootstrap – Sass version](https://github.com/thomas-mcdonald/bootstrap-sass)
* [Google Chart Tools](https://developers.google.com/chart/)
* [PouchDB](http://pouchdb.com/) (in progress) 

Heavily based on: [https://github.com/SimplyDo/projector](https://github.com/SimplyDo/projector)

## Angular.js feature highlights (WIP)

### RouteProvider

* Basic route setup
* Controller resolve (in progress)

### Views

* Using separate view templates

### Markup / data-ng attributes

* data-ng-class
* data-ng-click
* data-ng-repeat
* data-ng-model
* data-ng-view
* ng-cloak class="ng-cloak"

### Filters

Filters are powerful tools to simplify expressions in the markup.

In order to be able to set colours of amounts based on whether they are negative or positive, we can define this simple filter:

```
.filter('positiveNegative', function () {
	return function (value) {
		return value < 0 ? 'negative' : 'positive';
	};
});
```

Which is then possible to use in HTML to decide which CSS class to apply:

```
<td class="number" data-ng-class="(startBalance) + (change) | positiveNegative">
	{{(startBalance) + (change) | number:2}}
</td>
```

You might have spotted that we're also using the built in `number` filter which accepts a parameter for decimal place rounding.

### Directives

* Rendering a chart with a directive

### Services / factories

* Loading data with Promises using a Service (in progress)

## Setup instructions

### Using Yeoman

Coming soon

### Using Ruby Rack

If you have [Pow](http://pow.cx/) and [Powify](https://github.com/sethvargo/powify), you can run the app as simply as:

	powify create projector
	powify browse projector

Or just use any other Rack based webserver like [Thin](http://code.macournoyer.com/thin/).

### Anything else

Or just simply point a web server to the '/app' directory of this repository and view in any modern browser.

## TODO

* Start using [Yeoman](http://yeoman.io/)
* With that, use Bower to include Bootstrap and possibly the Angular - PouchDB connector
* Get a reasonably abstracted service running with deferred / promise interface using the current LocalStorage backend
* Implement PouchDB backend which is interchangeable with LocalStorage
* Write tests!
* Document the various Angular.js features used in the app
* Use built localisation for currency formatting