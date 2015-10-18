'use strict';

var dimHelper = function(dim) {
  return dim.group().reduceSum(function(d) {
    return d.endDate - d.startDate;
  });
};

var yearChart = dc.barChart('#year-chart');
tabsXFilter.getAllDataXFilter(function(crossFtr) {
  var dim = crossFtr.getMinuteDimension();
  var minTime = dim.bottom(1)[0] ? dim.bottom(1)[0].startDate : new Date();
  console.log(minTime);

  var durationGroup = dimHelper(dim);

  yearChart.width(1200)
          .height(40)
          .margins({top: 0, right: 50, bottom: 20, left: 40})
          .dimension(dim)
          .group(durationGroup)
          .colors(['#f27863'])
          .centerBar(true)
          .gap(1)
          .x(d3.time.scale().domain([minTime, new Date()]))
          .xUnits(d3.time.minutes)
          .yAxis().tickValues([]);

  var yearLineChart = dc.lineChart('#year-line-chart');
  yearLineChart.renderArea(true)
              .width(1200)
              .height(180)
              .transitionDuration(1000)
              .margins({top: 30, right: 50, bottom: 25, left: 40})
              .dimension(dim)
              .rangeChart(yearChart)
              .x(d3.time.scale().domain([minTime, new Date()]))
              .round(d3.time.minutes.round)
              .xUnits(d3.time.minutes)
              .elasticY(true)
              .renderHorizontalGridLines(true)
              .group(durationGroup)
              .colors(['#f27863'])
              .yAxis().tickFormat(function(v) {return Math.floor(v/60000);});

  var domainChart = dc.rowChart('#domain-chart');
  var domainDim = crossFtr.getDomainDimension();
  var domainDurationGroup = dimHelper(domainDim);
  domainChart.width(500)
            .height(175)
            .margins({top: 20, left: 10, right: 10, bottom: 20})
            .dimension(domainDim)
            .group(domainDurationGroup)
            .colors(['#f27a63'])
            .rowsCap(5)
            .elasticX(true)
            .xAxis().tickFormat(function(v) {return Math.floor(v/60000);}).ticks(4);

  var hourIntChart = dc.barChart('#hour-int-chart');
  var hourIntDim = crossFtr.getHourIntDimension();
  var durationIntGroup = dimHelper(hourIntDim);
  hourIntChart
    .width(500)
    .height(175)
    .margins({top: 10, right: 50, bottom: 20, left: 40})
    .dimension(hourIntDim)
    .group(durationIntGroup)
    .colors(['#f27a63'])
    .elasticY(true)
    .centerBar(true)
    .gap(1)
    .round(dc.round.floor)
    .x(d3.scale.linear().domain([0, 24]))
    .renderHorizontalGridLines(true)
    .yAxis().tickFormat(function(v) {return Math.floor(v/60000);});

  hourIntChart.xAxis().tickFormat(
      function (v) { return v; });
  hourIntChart.yAxis().ticks(5);

  dc.renderAll();
});

$('#reset').on('click', function() {
  dc.filterAll();
  dc.renderAll();
});