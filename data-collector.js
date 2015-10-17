(function() {
	var tabsLib = chrome.tabs;
	var windows = chrome.windows;

	var currentTab;
	var currentTabStartTime;

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
			if (protocol != 'chrome:') {
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
		});
	});

	tabsLib.onUpdated.addListener(function(tabId, changeInfo, tab) {
		console.log('onUpdated called');
		if (changeInfo.url && (!currentTab || (currentTab.url != changeInfo.url))) {
			changeCurrentTab(tab);
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

	setInterval(function() {
		tabsDB.getAll(function(res) {
			console.log(res);
		});
	}, 100000);
}());
