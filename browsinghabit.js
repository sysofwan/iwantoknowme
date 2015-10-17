'use strict';

var yearChart = dc.barChart('#year-chart');
tabsXFilter.getAllDataXFilter(function(yearCrossftr) {
  var dim = yearCrossftr.getWeekOfTheYearDimension();

  var durationGroup = dim.group().reduceSum(function(d) {
    return (d.endDate - d.startDate) / 3600000;
  });

  yearChart.width(990) /* dc.barChart('#monthly-volume-chart', 'chartGroup'); */
          .height(40)
          .margins({top: 0, right: 50, bottom: 20, left: 40})
          .dimension(dim)
          .group(durationGroup)
          .centerBar(true)
          .gap(1)
          .x(d3.time.scale().domain([new Date(1985, 0, 1), new Date(2012, 11, 31)]))
          .round(d3.time.month.round)
          .alwaysUseRounding(true)
          .xUnits(d3.time.months);

  dc.renderAll();
});

