(function() {
	var tabsLib = chrome.tabs;
	var windows = chrome.windows;

	var currentTab;
	var currentTabStartTime;

	var saveTab = function() {
		if (currentTab) {
			console.log("tab start:", currentTabStartTime, "tab end", new Date(), "tab_title", currentTab.title);
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
