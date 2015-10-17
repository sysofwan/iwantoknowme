var tabsXFilter = (function() {
	var module = {};
	var addXFilterExtensions = function(tabsXFilter) {

		tabsXFilter.getMinuteDimension = function() {
			return this.dimension(function(d) {
				var date = new Date(+d.startDate);
				date.setSeconds(0);
				return date;
			});
		};


		tabsXFilter.getHourDimension = function() {
			return this.dimension(function(d) {
				var date = new Date(+d.startDate);
				date.setSeconds(0).setMinutes(0);
				return date;
			});
		};

		tabsXFilter.getDateDimension = function() {
			return this.dimension(function(d) {
				var date = new Date(+d.startDate);
				date.setSeconds(0).setMinutes(0).setHours(0);
				return date;
			});
		};

		tabsXFilter.getWeekOfTheYearDimension = function() {
			return this.dimension(function(d) {
				var date = new Date(+d.startDate);
				var distance = date.getDay();
				date.setDate(date.getDate() - distance);
				return date;
			});
		};

		tabsXFilter.getDomainDimension = function() {
			return this.dimension(function(d) {
				return d.domain;
			});
		};
		return tabsXFilter;
	};

	module.getAllDataXFilter = function(callback) {
		tabsDB.getAll(function(res) {
			callback(addXFilterExtensions(crossfilter(res)));
		})
	};

	module.getDomainDataXFilter = function(domain, callback) {
		tabsDB.filterValue("domain", domain, function(res) {
			callback(addXFilterExtensions(crossfilter(res)));
		});
	};

	module.getRangeDataXFilter = function(startDate, endDate, callback) {
		tabsDB.filterRange("startDate", startDate, endDate, function(res) {
			callback(addXFilterExtensions(crossfilter(res)));
		});
	};

	return module;
}());

