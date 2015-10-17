(function() {
	var tabsLib = chrome.tabs;
	var windows = chrome.windows;

	var currentTab;
	var currentTabStartTime;

	var saveTab = function() {
		if (currentTab) {
			console.log("tab start:", currentTabStartTime, "tab end", new Date());
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
