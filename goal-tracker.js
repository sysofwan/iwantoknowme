(function() {
	var d = new Date();
	var prevDate = d.getDate();
	setInterval(function() {
		var goals = JSON.parse(localStorage["goals"]);
		var endTime = new Date();
		var startTime = new Date(endTime.getYear(), endTime.getMonth(), endTime.getDate());
		var date = endTime.getDate();
		if(prevDate != date) {
			for(var goal of goals) {
				goal.enable = true;
			}
		}
		tabsDB.filterRange("startDate", startTime, endTime, function(result) {
			var selectedTabs = result;
			console.log(selectedTabs);
			for(var goal of goals) {
				var tabsByDomain = _.filter(selectedTabs, { "domain": goal.domain });
				var minutesSpent = _.sum(tabsByDomain, function(elem) {
					return (elem.endDate - elem.startDate) / 1000 / 60;
				});
				if(minutesSpent >= goal.duration) {
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
		});
	}, 60000);
}());