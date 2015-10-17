(function() {
	var tabsLib = chrome.tabs;
	var windows = chrome.windows;

	var currentTab;
	var currentTabStartTime;
	var tabViews = [];

	var saveTab = function() {
		if (currentTab) {
			data = {
				title:currentTab.title,
				url:currentTab.url,
				startDate:currentTabStartTime,
				endDate:new Date()
			};
			tabViews.push(data);
		}
	};

	var kaka = {name:"kaka", email:"kaka"};
	tabsDB.add(kaka);
	tabsDB.getAll(function(result) {
		console.log(result);
	});

	tabsLib.onActivated.addListener(function(activeInfo) {
		tabsLib.get(activeInfo.tabId, function(tab) {
			saveTab();
			currentTab = tab;
			currentTabStartTime = new Date();
		});
		if(tabViews.length != 0){
			console.log(tabViews[0]["endDate"])
		}
	});

	windows.onFocusChanged.addListener(function(windowId) {
		saveTab();
		currentTab = null;
		currentTabStartTime = null;
		if (windowId != windows.WINDOW_ID_NONE) {
			windows.get(windowId, function(window) {
				if (window.type == "normal") {
					tabsLib.query({active: true, windowId: windowId}, function(tab) {
						currentTab = tab[0];
						currentTabStartTime = new Date();
					});
				}
			});
		}
	});
}());
