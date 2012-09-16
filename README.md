## Balance Projector – an Angular.js learning project

Balance Projector can provide quick insights into your immediate financial future. The real time interface updates on every change and makes somewhat abstract numbers very tangible.

You can see a working version of it at: [http://daaain.github.com/projector/app/index.html](http://daaain.github.com/projector/app/index.html)

Built with:

* [Google AngularJS](http://angularjs.org/)
* [Twitter Bootstrap – Sass version](https://github.com/thomas-mcdonald/bootstrap-sass)
* [Google Chart Tools](https://developers.google.com/chart/)
* [PouchDB](http://pouchdb.com/) (in progress) 

Heavily based on: [https://github.com/SimplyDo/projector](https://github.com/SimplyDo/projector)

## Instructions

Simply point a web server to the '/app' directory of this repository and view in any modern browser.

If you have [Pow](http://pow.cx/) and [Powify](https://github.com/sethvargo/powify), you can run the app as simply as:

	powify create projector
	powify browse projector

Or just use any other Rack based webserver like [Thin](http://code.macournoyer.com/thin/).

## TODO

* Start using [Yeoman](http://yeoman.io/)
* Get a reasonably abstracted service running with deferred / promise interface using the current LocalStorage backend
* Implement PouchDB backend which is interchangeable with LocalStorage
* Write tests!
* Document the various Angular.js feature used in the app