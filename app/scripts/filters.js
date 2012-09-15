'use strict';

/* Filters */

angular.module('projectorApp.filters', [])
	.filter('interpolate', ['version', function (version) {
		return function (text) {
			return String(text).replace(/\%VERSION\%/mg, version);
		};
	}])
	.filter('positiveNegative', function () {
		return function (value) {
			return value < 0 ? 'negative' : 'positive';
		};
	});