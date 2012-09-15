'use strict';

// CRUD service wrapper could be a nice curry? :)
// http://www.gridlinked.info/understanding-function-currying/

// Using promises
// http://jsfiddle.net/dain/QjnML/4/
// http://stackoverflow.com/questions/12115151/angularjs-service-with-promises

// PouchDB in Angular
// http://jsfiddle.net/zrrrzzt/cNVhE/

var servicesModule = angular.module('LocalStorageService', []);
servicesModule.value('version', '0.1');
servicesModule.factory('LocalStorageService', function () {

	//factory function body that constructs newServiceInstance
	var newServiceInstance = function () {};

	newServiceInstance.prototype.getObject = function (key) {
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

	newServiceInstance.prototype.clear = function () {
		localStorage.clear();
	};

	newServiceInstance.prototype.supported = function () {
		return 'localStorage' in window && window['localStorage'] !== null;
	};

	
	newServiceInstance.prototype.saveObject = function (objectToSave, key) {
		// Save object to local storage under key
		localStorage[key] = JSON.stringify(objectToSave);
	};
	
	return newServiceInstance;

});

var projectorAppORMServiceInstance = angular.module('projectorApp.projectorAppORMServiceInstance',
		['LocalStorageService']
	);
projectorAppORMServiceInstance.value('version', '0.1');
projectorAppORMServiceInstance.factory('ProjectorAppORMServiceInstance', function (LocalStorageService) {

	var projectorAppORMServiceInstance = new LocalStorageService();

	projectorAppORMServiceInstance.TransactionModel = function () {
		return {
			active: true,
			name: '',
			amount: 0,
			valid: false
		};
	};
	projectorAppORMServiceInstance.RecurringTransactionModel = function () {
		var model = new projectorAppORMServiceInstance.TransactionModel();
		model.frequency = 1;
		return model;
	};
	projectorAppORMServiceInstance.SingleTransactionModel = function () {
		var model = new projectorAppORMServiceInstance.TransactionModel();
		model.date = new Date();
		return model;
	};

	return projectorAppORMServiceInstance;

});