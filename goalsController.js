var browsingAnalyticsApp = angular.module('browsingAnalyticsApp', []);

browsingAnalyticsApp.controller("GoalsController", function($scope) {

	var domainDim, xfilter;
	var startDate = new Date();
	startDate.setHours(0,0,0,0);
	tabsXFilter.getRangeDataXFilter(startDate, new Date(), function(crossfilter) {
		xfilter = crossfilter;
		domainDim = xfilter.getDomainDimension();
		$scope.$apply();
	});

	var init = function() {
		if(!localStorage["goals"]) {
			localStorage["goals"] = "[]";
		}
		$scope.goals = angular.fromJson(localStorage["goals"]);
		console.log($scope.goals);
	};
	init();

	$scope.removeGoal = function(index) {
		$scope.goals.splice(index, 1);
		localStorage["goals"] = JSON.stringify($scope.goals);
	};

	$scope.addGoal = function() {
		console.log('asdasd');
		var goal = {
			domain: $scope.domain,
			duration: parseInt($scope.duration),
			numAlerts: 0
		};
		$scope.goals.push(goal);
		localStorage["goals"] = JSON.stringify($scope.goals);
	};

	$scope.getRemainingDuration = function(goal) {
		if (domainDim) {
			domainDim.filterAll();
			domainDim.filterExact(goal.domain);
			var group = xfilter.groupAll();
			var grouped = group.reduceSum(function(d) {
				return (d.endDate - d.startDate)/60000;
			});
			return goal.duration - Math.ceil(grouped.value());
		}
		return goal.duration;
	};
});