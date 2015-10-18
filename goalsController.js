var browsingAnalyticsApp = angular.module('browsingAnalyticsApp', []);

browsingAnalyticsApp.controller("GoalsController", function($scope) {
	
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
		var goal = {
			domain: $scope.domain,
			duration: parseInt($scope.duration)
		};
		$scope.goals.push(goal);
		localStorage["goals"] = JSON.stringify($scope.goals);
	};
});