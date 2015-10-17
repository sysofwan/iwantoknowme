
(function() {
	var tabsLib = chrome.tabs;
	var currentTab;
	var currentTabStartTime;

	tabsLib.onActivated.addListener(function(activeInfo) {
		tabsLib.get(activeInfo.tabId, function(tab) {
			currentTab = tab;
			currentTabStartTime = new Date();
		})
	});



}());