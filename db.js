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
	    	var openRequest = indexedDB.open("iwanttoknowme",4);
	 
		    openRequest.onupgradeneeded = function(e) {
		        var thisDB = e.target.result;
		        thisDB.deleteObjectStore("activeTabs");
	            var store = thisDB.createObjectStore("activeTabs");
	            store.createIndex("domain","domain", {unique:false});
				store.createIndex("endDate","endDate", {unique:false});
				store.createIndex("startDate","startDate", {unique:false});
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
		    var results = [];
		 	var request = store.openCursor();
		 
		    request.onerror = function(e) {
		        console.log("getAllActiveTabs error",e.target.error.name);
		    }
		 
		    request.onsuccess = function(e) {
		    	var cursor = e.target.result;
		    	if(cursor) {
		    		results.push(cursor.value);
		    		cursor.continue();
		    	}
		    	else {
		    		callback(results);
		    	}
		    }
		});
	};

	tDB.filterRange = function(field, end, start, callback) {
		open(function() {
			var transaction = db.transaction(["activeTabs"],"readwrite");
		    var store = transaction.objectStore("activeTabs");
		    var range = IDBKeyRange.bound(end, start);
            var index = store.index(field);
            var request = index.openCursor(range);
            var results = [];

            request.onsuccess = function(e) {
            	var cursor = e.target.result;
		    	if(cursor) {
		    		results.push(cursor.value);
		    		cursor.continue();
		    	}
		    	else {
		    		callback(results);
		    	}
            };
		});
	};

	tDB.filterValue = function(field, value, callback) {
		tDB.filterRange(field, value, value, callback);
	};

	return tDB;
}());