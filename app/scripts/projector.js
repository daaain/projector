'use strict';

// Declare app level module which depends on filters, and services
var projectorApp = angular.module('projectorApp',
		['projectorApp.filters', 'projectorApp.projectorAppORMServiceInstance', 'projectorApp.directives']
	)
	.config(['$routeProvider', function ($routeProvider) {
		$routeProvider
			.when('/', {
				templateUrl: 'views/about.html',
				controller: 'aboutCtrl'
			})
			.when('/projector', {
				templateUrl: 'views/projector.html',
				controller: 'projectorCtrl'
			})
			.otherwise({
				redirectTo: '/'
			});
	}]);
