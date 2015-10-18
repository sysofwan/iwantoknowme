'use strict';

var dimHelper = function(dim) {
  return dim.group().reduceSum(function(d) {
    return (d.endDate - d.startDate) / 60000;
  });
};

var yearChart = dc.barChart('#year-chart');
tabsXFilter.getAllDataXFilter(function(crossFtr) {
  var dim = crossFtr.getMinuteDimension();

  var durationGroup = dimHelper(dim);

  yearChart.width(1750) 
          .height(50)
          .margins({top: 0, right: 50, bottom: 20, left: 40})
          .dimension(dim)
          .group(durationGroup)
          .colors(['#f27863'])
          .centerBar(true)
          .gap(1)
          .x(d3.time.scale().domain([new Date(2015, 9, 17, 14, 0, 0), new Date(2015, 9, 17, 15, 0, 0)]))
          .xUnits(d3.time.minutes)
          .yAxis().tickValues([]);

  var yearLineChart = dc.lineChart('#year-line-chart');
  yearLineChart.renderArea(true)
              .width(1750)
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
              .group(durationGroup)
              .colors(['#f27863']);

  var domainChart = dc.rowChart('#domain-chart');
  var domainDim = crossFtr.getDomainDimension();
  var domainDurationGroup = dimHelper(domainDim);
  domainChart.width(700)
            .height(275)
            .margins({top: 20, left: 10, right: 10, bottom: 20})
            .dimension(domainDim)
            .group(domainDurationGroup)
            .colors(['#a4a8a4', '#acdfd2', '#dcda98', '#f29885', '#a4a8a4', '#acdfd2', '#dcda98', '#f29885', '#a4a8a4', '#acdfd2', '#dcda98', '#f29885'])
            .title(function (d) {
                return d.value;
            })
            .elasticX(true)
            .xAxis().ticks(4);
  console.log(domainDurationGroup.top(5));

  var hourIntChart = dc.barChart('#hour-int-chart');
  var hourIntDim = crossFtr.getHourIntDimension();
  var durationIntGroup = dimHelper(hourIntDim);
  hourIntChart
    .width(700)
    .height(275)
    .margins({top: 10, right: 50, bottom: 20, left: 40})
    .dimension(hourIntDim)
    .group(durationIntGroup)
    .colors(['#f27a63'])
    .elasticY(true) 
    .centerBar(true) 
    .gap(1) 
    .round(dc.round.floor)
    .x(d3.scale.linear().domain([0, 24]))
    .renderHorizontalGridLines(true);
 
  hourIntChart.xAxis().tickFormat(
      function (v) { return v; });
  hourIntChart.yAxis().ticks(5);

  dc.renderAll();
});