(function() {
	$('.btn-footer button').on('click', function() {
		chrome.tabs.create({ url: "browsinghabit.html" });
	});

	var duration = function(d) {return d.endDate - d.startDate;};

	var yest = new Date()
	yest.setDate(yest.getDate() - 1);
	tabsXFilter.getRangeDataXFilter(yest, new Date(), function(crossfilter) {
		var group = crossfilter.groupAll();
		var g = group.reduceSum(duration);
		var dial = $(".dial");
		dial.val(Math.ceil(g.value()/(1000 * 60 * 60)));
		dial.knob();

		var dimen = crossfilter.getDomainDimension();
		var domainGroup = dimen.group();
		var grouped = domainGroup.reduceSum(duration);

		var groupedVal = grouped.top(3);
		var topSitesList = $('.top-sites ul');
		groupedVal.forEach(function(obj) {
			topSitesList.append('<li>' + obj.key + '</li>');
		});

	});
}());