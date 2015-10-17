(function() {

	var windows = chrome.windows;
	windows.onFocusChanged.addListener(function(windowId) {

		console.log(windowId);
		
	})
})();