(function() {
	var tabsLib = chrome.tabs;
	var windows = chrome.windows;

	var currentTab;
	var currentTabStartTime;

	var checkViolatedGoals = function(currDomain) {
		console.log("JUST GOT IN");
		var goals = JSON.parse(localStorage["goals"]);
		for(goal of goals) {
			if(goal.numAlerts > 0 && goal.domain == currDomain) {
				console.log("kak")
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
		localStorage.setItem("goals", JSON.stringify(goals));
	};

	var saveTab = function() {
		console.log('save tab called');
		if (currentTab) {
			data = {
				title: currentTab.title,
				url: currentTab.url,
				domain: util.urlParser(currentTab.url).hostname,
				startDate: currentTabStartTime,
				endDate: new Date()
			};
			tabsDB.add(data);
			console.log(data);
		}
	};

	var changeCurrentTab = function(tab) {
		saveTab();
		currentTab = null;
		currentTabStartTime = null;
		if (tab) {
			var protocol = util.urlParser(tab.url).protocol;
			if (!protocol.startsWith('chrome')) {
				currentTab = tab;
				currentTabStartTime = new Date();
			}
		}
	};

	tabsLib.onActivated.addListener(function(activeInfo) {
		console.log('onActivated called');
		tabsLib.get(activeInfo.tabId, function(tab) {
			if (!currentTab || currentTab.id != tab.id) {
				changeCurrentTab(tab);
			}
			checkViolatedGoals(util.urlParser(tab.url).hostname);
		});
	});

	tabsLib.onUpdated.addListener(function(tabId, changeInfo, tab) {
		console.log('onUpdated called', tab.active);
		if (tab.active && changeInfo.url
				&& (!currentTab || (currentTab.url != changeInfo.url))) {
			changeCurrentTab(tab);
		}
		if (tab.active && changeInfo.url) {
			checkViolatedGoals(util.urlParser(changeInfo.url).hostname);
		}
	});

	windows.onFocusChanged.addListener(function(windowId) {
		console.log('onFocusChanged called');
		if (windowId == windows.WINDOW_ID_NONE) {
			changeCurrentTab(null);
		}
		else {
			windows.get(windowId, function(window) {
				if (window.type != "normal") {
					changeCurrentTab(null);
				} else {
					tabsLib.query({active: true, windowId: windowId}, function(tabs) {
						var tab = tabs[0];
						if (!currentTab || tab.id != currentTab.id) {
							changeCurrentTab(tab[0]);
						}
					});
				}
			});
		}
	});

	chrome.idle.onStateChanged.addListener(function(newState) {
		if (newState == "idle" || newState ==  "locked") {
			changeCurrentTab(null);
		}
	});
}());