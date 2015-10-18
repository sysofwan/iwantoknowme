(function() {
	setInterval(function() {
		var goals = JSON.parse(localStorage["goals"]);
		var startTime = new Date();
		var endTime = new Date();
		startTime.setTime(startTime.getTime() - (24 * 60 * 60 * 1000));
		tabsDB.filterRange("startDate", startTime, endTime, function(result) {
			var selectedTabs = result;
			for(var goal of goals) {
				var tabsByDomain = _.filter(selectedTabs, { "domain": goal.domain });
				var minutesSpent = _.sum(tabsByDomain, function(elem) {
					return (elem.endDate - elem.startDate) / 1000 / 60;
				});
				if(minutesSpent >= goal.duration) {
					alert("exceed limit");
				}
			}
		});
	}, 60000);
}());