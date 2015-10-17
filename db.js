var tabsDB = (function() {
	var tDB = {};
	var db;
	var idx = 0;
 
	tDB.open = function(callback) {
	    var openRequest = indexedDB.open("iwanttoknowme",1);
	 
	    openRequest.onupgradeneeded = function(e) {
	        var thisDB = e.target.result;
	 
	        if(!thisDB.objectStoreNames.contains("activeTabs")) {
	            thisDB.createObjectStore("activeTabs");
	        }
	    }
	 
	    openRequest.onsuccess = function(e) {
	        console.log("running onsuccess");
	        db = e.target.result;
	        callback();
	    }
	 
	    openRequest.onerror = function(e) {
	        console.log("error opening table");
	    }
	 
	};

	tDB.addActiveTab = function(newActiveTab) {	 
	    var transaction = db.transaction(["activeTabs"],"readwrite");
	    var store = transaction.objectStore("activeTabs");
	 	var request = store.add(newActiveTab, idx++);
	 
	    request.onerror = function(e) {
	        console.log("addActiveTab error",e.target.error.name);
	    }
	 
	    request.onsuccess = function(e) {
	        console.log("addActiveTab success");
	    }
	};

	tDB.getAllActiveTabs = function(callback) {
		var transaction = db.transaction(["activeTabs"],"readwrite");
	    var store = transaction.objectStore("activeTabs");
	 	var cursor = store.openCursor();
	 
	    cursor.onerror = function(e) {
	        console.log("getAllActiveTabs error",e.target.error.name);
	    }
	 
	    cursor.onsuccess = function(e) {
	    	var res = e.target.result;
	    	console.log("getAllActiveTabs success");
	    	callback(res);
	    }
	};

	return tDB;
}());