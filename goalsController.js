var browsingAnalyticsApp = angular.module('browsingAnalyticsApp', []);

browsingAnalyticsApp.controller("GoalsController", function($scope) {
	
	$scope.init = function() {
		if (localStorage["goals"]==null){
			localStorage["goals"]=[];
		}
		$scope.goals = localStorage;
		
	}

	$scope.addGoal = function() {
		var goal = {
			domain: $scope.domain;
			duration: $scope.duration;
		}
		$scope.goals.push(goal);
		localStorage["goals"].push(goal);
	};
});