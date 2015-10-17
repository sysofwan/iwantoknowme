var tabsDB = (function() {
	var tDB = {};
	var db;
	var idx = 0;
	var isOpen = false;

	var getCount = function(callback) {
		var transaction = db.transaction(["activeTabs"],"readwrite");
    	var store = transaction.objectStore("activeTabs");
        var request = store.count();
		request.onsuccess = function() {
			callback(request.result);
		}
	};
 
	var open = function(callback) {
	    if(!isOpen) {
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
		        getCount(function(count) {
		        	idx = count;
		        	isOpen = true;
		        	callback();
		        });
		    }
		 
		    openRequest.onerror = function(e) {
		        console.log("error opening table");
		    }
	    }
	    else {
	    	callback();
	    }
	};

	tDB.add = function(newActiveTab) {
		open(function() {
			var transaction = db.transaction(["activeTabs"],"readwrite");
		    var store = transaction.objectStore("activeTabs");
		 	var request = store.add(newActiveTab, idx++);
		 
		    request.onerror = function(e) {
		        console.log("addActiveTab error",e.target.error.name);
		    }
		 
		    request.onsuccess = function(e) {
		        console.log("addActiveTab success");
		    }
		});
	};

	tDB.getAll = function(callback) {
		open(function() {
			var transaction = db.transaction(["activeTabs"],"readwrite");
		    var store = transaction.objectStore("activeTabs");
		    var result = [];
		 	var request = store.openCursor();
		 
		    request.onerror = function(e) {
		        console.log("getAllActiveTabs error",e.target.error.name);
		    }
		 
		    request.onsuccess = function(e) {
		    	var cursor = e.target.result;
		    	if(cursor) {
		    		result.push(cursor.value);
		    		cursor.continue();
		    	}
		    	else {
		    		callback(result);
		    	}
		    }
		});
	};

	tDB.and = function() {
		open(function(valuesArr, rangesArr) {

		});
	};

	return tDB;
}());