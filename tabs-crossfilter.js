var tabsXFilter = (function() {
	var module = {};
	var addXFilterExtensions = function(tabsXFilter) {

		tabsXFilter.getHourDimension = function() {
			return this.dimension(function(d) {
				d.startDate.getHours();
			});
		};

		tabsXFilter.getDateDimension = function() {
			return this.dimension(function(d) {
				d.startDate.getDate();
			});
		};

		tabsXFilter.getWeekOfTheYearDimension = function() {
			return this.dimension(function(d) {
				var date = new Date(+d.startDate);
				date.setHours(0,0,0);
				date.setDate(date.getDate()+4-(date.getDay()||7));
				return Math.ceil((((date-new Date(date.getFullYear(),0,1))/8.64e7)+1)/7);
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

