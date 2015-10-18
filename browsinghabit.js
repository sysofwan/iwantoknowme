'use strict';

var dimHelper = function(dim) {
  return dim.group().reduceSum(function(d) {
    return (d.endDate - d.startDate);
  });
};

var yearChart = dc.barChart('#year-chart');
tabsXFilter.getAllDataXFilter(function(crossFtr) {
  var dim = crossFtr.getMinuteDimension();

  var durationGroup = dimHelper(dim);

  yearChart.width(990) 
          .height(50)
          .margins({top: 0, right: 50, bottom: 20, left: 40})
          .dimension(dim)
          .group(durationGroup)
          .centerBar(true)
          .gap(1)
          .x(d3.time.scale().domain([new Date(2015, 9, 17, 14, 0, 0), new Date(2015, 9, 17, 15, 0, 0)]))
          .xUnits(d3.time.minutes)
          .yAxis().tickValues([]);

  var yearLineChart = dc.lineChart('#year-line-chart');
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

  var domainChart = dc.rowChart('#domain-chart');
  var domainDim = crossFtr.getDomainDimension();
  var domainDurationGroup = dimHelper(domainDim);
  domainChart.width(300)
            .height(230)
            .margins({top: 20, left: 10, right: 10, bottom: 20})
            .dimension(domainDim)
            .group(domainDurationGroup)
            .colors(['#acdfd2', '#dcda98', '#f29885', '#c6dbef', '#dadaeb'])
            .label(function (d) {
                return d.key.split('.')[1];
            })
            .title(function (d) {
                return d.value;
            })
            .elasticX(true)
            .xAxis().ticks(4);

  var hourIntChart = dc.barChart('#hour-int-chart');
  var hourIntDim = crossFtr.getHourIntDimension();
  var durationIntGroup = dimHelper(hourIntDim);
  hourIntChart
    .width(420)
    .height(180)
    .margins({top: 10, right: 50, bottom: 30, left: 40})
    .dimension(hourIntDim)
    .group(durationIntGroup)
    .elasticY(true) 
    .centerBar(true) 
    .gap(1) 
    .round(dc.round.floor)
    .x(d3.scale.linear().domain([0, 24]))
    .renderHorizontalGridLines(true) 
    .filterPrinter(function (filters) {
        var filter = filters[0], s = '';
        s += numberFormat(filter[0]) + '% -> ' + numberFormat(filter[1]) + '%';
        return s;
    });
 
  hourIntChart.xAxis().tickFormat(
      function (v) { return v; });
  hourIntChart.yAxis().ticks(5);

  dc.renderAll();
});