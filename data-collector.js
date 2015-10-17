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
			tabViews.push(data)
		}
	};

	tabsLib.onActivated.addListener(function(activeInfo) {
		tabsLib.get(activeInfo.tabId, function(tab) {
			saveTab();
			currentTab = tab;
			currentTabStartTime = new Date();
		});
	});

	windows.onFocusChanged.addListener(function(windowId) {
		if (windowId == windows.WINDOW_ID_NONE) {
			saveTab();
			var currentTab = null;
			var currentTabStartTime = null;
		} else {
			tabsLib.getCurrent(function(tab) {
				currentTab = tab;
				currentTabStartTime = new Date();
			});
		}
	});



}());
