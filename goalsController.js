var browsingAnalyticsApp = angular.module('browsingAnalyticsApp', []);

browsingAnalyticsApp.controller("GoalsController", function($scope) {
	
	$scope.init = function() {
		chrome.storage.local.get("goals", function(result) {
			if(_.isEmpty(result)) {
				chrome.storage.local.set({"goals": []});
				$scope.goals = [];
			}
			else {
				console.log(result);
				$scope.goals = result;
			}
		});
	}

	$scope.addGoal = function() {
		var goal = {
			domain: $scope.domain,
			duration: $scope.duration
		}
		$scope.goals.push(goal);
		chrome.storage.local.set({"goals": $scope.goals});
	};
});