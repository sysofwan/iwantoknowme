(function() {
	var d = new Date();
	var prevDate = d.getDate();
	setInterval(function() {
		var goals = JSON.parse(localStorage["goals"]);
		var endTime = new Date();
		var startTime = new Date(endTime.getYear(), endTime.getMonth(), endTime.getDate());
		var date = endTime.getDate();
		if(prevDate != date) {
			console.log(prevDate);
			for(var goal of goals) {
				goal.numAlerts = 0;
			}
		}
		tabsDB.filterRange("startDate", startTime, endTime, function(result) {
			var selectedTabs = result;
			for(var goal of goals) {
				if(goal.numAlerts > 0) {
					continue;
				}
				var tabsByDomain = _.filter(selectedTabs, { "domain": goal.domain });
				var minutesSpent = _.sum(tabsByDomain, function(elem) {
					return (elem.endDate - elem.startDate) / 1000 / 60;
				});
				if(minutesSpent >= goal.duration) {
					goal.numAlerts++;
					chrome.notifications.clear(goal.domain);
					var notification = chrome.notifications.create(
						goal.domain,
						{ 
							type: "basic",
							iconUrl: "angry.png",
							title: goal.domain + " overload notice",
							message: "Remember the project due next Monday?"
						}
					);
				}
			}
			prevDate = date;
			console.log(goals);
			localStorage.setItem("goals", JSON.stringify(goals));
		});
	}, 60000);
}());