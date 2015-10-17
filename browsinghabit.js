'use strict';

var yearChart = dc.barChart('#year-chart');
tabsXFilter.getAllDataXFilter(function(yearCrossftr) {
  var dim = yearCrossftr.getMinuteDimension();
  console.log(dim.top(5));

  var durationGroup = dim.group().reduceSum(function(d) {
    console.log(d.endDate - d.startDate);
    return (d.endDate - d.startDate);
  });
  console.log(durationGroup.top(5));

  yearChart.width(990) /* dc.barChart('#monthly-volume-chart', 'chartGroup'); */
          .height(40)
          .margins({top: 0, right: 50, bottom: 20, left: 40})
          .dimension(dim)
          .group(durationGroup)
          .centerBar(true)
          .gap(1)
          .x(d3.time.scale().domain([new Date(2015, 9, 17, 14, 0, 0), new Date(2015, 9, 17, 15, 0, 0)]))
          .xUnits(d3.time.minutes)
          .yAxis().tickValues([]);
  console.log(yearChart);

  dc.renderAll();
});

var yearLineChart = dc.lineChart('#year-line-chart');
tabsXFilter.getAllDataXFilter(function(yearCrossftr) {
  var dim = yearCrossftr.getMinuteDimension();
  console.log(dim.top(5));

  var durationGroup = dim.group().reduceSum(function(d) {
    console.log(d.endDate - d.startDate);
    return (d.endDate - d.startDate);
  });

  yearLineChart.renderArea(true)
              .width(990)
              .height(200)
              .transitionDuration(1000)
              .margins({top: 30, right: 50, bottom: 25, left: 40})
              .dimension(dim)
              .mouseZoomable(true)
       
              .rangeChart(yearChart)
              .x(d3.time.scale().domain([new Date(2015, 9, 17, 14, 0, 0), new Date(2015, 9, 17, 15, 0, 0)]))
              .round(d3.time.minutes.round)
              .xUnits(d3.time.minutes)
              .elasticY(true)
              .renderHorizontalGridLines(true)
              .group(durationGroup);
  dc.renderAll();
});