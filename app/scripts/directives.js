'use strict';

/* Directives */

angular.module('projectorApp.directives', [])
	.directive('appVersion', ['version', function (version) {
		return function (scope, elm, attrs) {
			elm.text(version);
		};
	}])
	.directive('chart', function () {
		return {
			restrict: 'E',
			link: function (scope, elm, attr) {
				var chart = new google.visualization.AreaChart(elm[0]);
				var columns = scope.$eval(attr.columns);

				var options = {
					title: attr.title,
					width: parseInt(attr.width, 10),
					height: parseInt(attr.height, 10)
				};

				var dataMaster = new google.visualization.DataTable();
				columns.forEach(function (column) {
					dataMaster.addColumn(column[0], column[1]);
				});

				scope.$watch(attr.rows, function (rows) {
					var data = dataMaster.clone();
					data.addRows(rows);
					chart.draw(data);
				}, true);
			},
			template: '<div></div>',
			replace: true
		};
	});
