'use strict';

/* Services */

// CRUD service wrapper could be a nice curry? :)
// http://www.gridlinked.info/understanding-function-currying/

// Using promises
// http://jsfiddle.net/dain/QjnML/4/
// http://stackoverflow.com/questions/12115151/angularjs-service-with-promises

// PouchDB in Angular
// http://jsfiddle.net/zrrrzzt/cNVhE/

// Demonstrate how to register services
// In this case it is a simple value service.

function RecurringTransactionModel() {
	return {
		active: true,
		name: '',
		amount: 0,
		frequency: 1
	};
}

function SingleTransactionModel() {
	return {
		active: true,
		name: '',
		amount: 0,
		month: 1
	};
}

var servicesModule = angular.module('projectorApp.services', []);

servicesModule.value('version', '0.1');

servicesModule.factory('Storage', function () {

	//factory function body that constructs newServiceInstance
	var newServiceInstance = {};

	newServiceInstance.getObject = function (key) {
		// variable to hold date found in local storage
		var data = [];

		// retrieve json data from local storage for key
		var json_object = localStorage[key];

		// if data was found in local storage convert to object
		if (json_object) {
			data = JSON.parse(json_object);
		}
		return data;
	};

	newServiceInstance.clear = function () {
		localStorage.clear();
	};

	newServiceInstance.supported = function () {
		return 'localStorage' in window && window['localStorage'] !== null;
	};

	
	newServiceInstance.saveObject = function (objectToSave, key) {
		// Save object to local storage under key
		localStorage[key] = JSON.stringify(objectToSave);
	};
	
	return newServiceInstance;

});