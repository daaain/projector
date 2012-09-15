'use strict';

function projectorCtrl($scope, Storage) {

	$scope.startBalance = Storage.getObject('startBalance');
	$scope.expenses = Storage.getObject('expenses');
	$scope.incomes = Storage.getObject('incomes');
	$scope.nonRecurring = Storage.getObject('nonRecurring');
	$scope.storageSupport = Storage.supported();

	/**
	 * Beginning of section to be refactored into a service
	 */

	$scope.initForm = function () {
		if ($scope.incomes.length < 1) {
			$scope.addIncome();
		}
		if ($scope.expenses.length < 1) {
			$scope.addExpense();
		}
		if ($scope.nonRecurring.length < 1) {
			$scope.addTransaction();
		}
	};

	$scope.initForm();

	$scope.save = function () {
		Storage.saveObject($scope.expenses, 'expenses');
		Storage.saveObject($scope.incomes, 'incomes');
		Storage.saveObject($scope.startBalance, 'startBalance');
		Storage.saveObject($scope.nonRecurring, 'nonRecurring');
	};

	$scope.clear = function () {
		Storage.clear();
		$scope.startBalance = [];
		$scope.expenses = [];
		$scope.incomes = [];
		$scope.nonRecurring = [];
		$scope.initForm();
	};

	$scope.addExpense = function () {
		$scope.expenses.push(new RecurringTransactionModel());
	};

	$scope.removeExpense = function (index) {
		$scope.expenses.splice(index, 1);
	};

	$scope.addIncome = function () {
		$scope.incomes.push(new RecurringTransactionModel());
	};

	$scope.removeIncome = function (index) {
		$scope.incomes.splice(index, 1);
	};

	$scope.addTransaction = function () {
		$scope.nonRecurring.push(new SingleTransactionModel());
	};

	$scope.removeTransaction = function (index) {
		$scope.nonRecurring.splice(index, 1);
	};

	/**
	 * End of section to be refactored into a service
	 */

	$scope.tallyTransactions = function () {
		var total = 0;
		var oneOff = 0;

		for (var m = 0; m < $scope.nonRecurring.length; m++) {
			oneOff = $scope.nonRecurring[m].amount;
			if (oneOff !== 0) {
				if ($scope.nonRecurring[m].active) {
					total = total + oneOff;
				}
			}
		}

		return total;
	};

	$scope.monthlyIncome = function () {
		var total = 0;
		var thisMonth;
		for (var i = 0; i < $scope.incomes.length; i++) {
			thisMonth = $scope.incomes[i].amount;
			if (thisMonth !== 0) {
				if ($scope.incomes[i].active) {
					total = total + (thisMonth * $scope.incomes[i].frequency);
				}
			}
		}
		return total;
	};

	$scope.monthlyExpense = function () {
		var total = 0;
		var thisMonth;
		for (var i = 0; i < $scope.expenses.length; i++) {
			thisMonth = $scope.expenses[i].amount;
			if (thisMonth !== 0) {
				if ($scope.expenses[i].active) {
					total = total + (thisMonth * $scope.expenses[i].frequency);
				}
			}
		}
		return total;
	};

	$scope.monthlyNet = function () {
		var income = $scope.monthlyIncome();
		var expense = $scope.monthlyExpense();

		return income - expense;
	};

	$scope.montlyProjection = function () {
		var monthByMonth = [];
		var runningTotal = 0;
		var oneOff = 0;

		for (var i = 0; i < 12; i++) {
			runningTotal = runningTotal + $scope.monthlyNet();

			// add applicable one-off transations
			for (var m = 0; m < $scope.nonRecurring.length; m++) {
				if ($scope.nonRecurring[m].month === i + 1) {
					oneOff = $scope.nonRecurring[m].amount;
					if (oneOff !== 0) {
						if ($scope.nonRecurring[m].active) {
							runningTotal = runningTotal + oneOff;
						}
					}
				}
			}

			monthByMonth[i] = runningTotal;
		}
		return monthByMonth;
	};

	// Refactor: should come from localisation library
	// http://docs.angularjs.org/guide/i18n
	// Once that's in place we can also use the currency filter too:
	// http://docs.angularjs.org/api/ng.filter:currency
	// https://groups.google.com/forum/#!msg/angular/8mAc7h5NBd4/UjtPpWFqfnYJ
	$scope.getMonthLabel = function (monthAhead) {
		var d = new Date();
		var currentMonth = d.getMonth();
		var year = d.getFullYear();
		var monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

		var futureMonth = currentMonth + monthAhead;
		if (futureMonth > 11) {
			futureMonth = futureMonth - 12;
			year = year + 1;
		}
		return monthNames[futureMonth] + ' ' + year;
	};

}