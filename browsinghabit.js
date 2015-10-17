'use strict';

var yearChart = dc.barChart('#year-chart');
var domainChart = dc.rowChart('#domain-chart');

d3.json('*.json', function(data) {
  var result = crossfilter(data);
  var all = result.groupAll();

  var yearlyDimension = ??;
  var yearlyPerformanceGroup = yearlyDimension.group().reduce(
    /* callback for when data is added to the current filter results */
    function (p, v) {
      ++p.count;
      p.absGain += v.close - v.open;
      p.fluctuation += Math.abs(v.close - v.open);
      p.sumIndex += (v.open + v.close) / 2;
      p.avgIndex = p.sumIndex / p.count;
      p.percentageGain = p.avgIndex ? (p.absGain / p.avgIndex) * 100 : 0;
      p.fluctuationPercentage = p.avgIndex ? (p.fluctuation / p.avgIndex) * 100 : 0;
      return p;
    },
    /* callback for when data is removed from the current filter results */
    function (p, v) {
      --p.count;
      p.absGain -= v.close - v.open;
      p.fluctuation -= Math.abs(v.close - v.open);
      p.sumIndex -= (v.open + v.close) / 2;
      p.avgIndex = p.count ? p.sumIndex / p.count : 0;
      p.percentageGain = p.avgIndex ? (p.absGain / p.avgIndex) * 100 : 0;
      p.fluctuationPercentage = p.avgIndex ? (p.fluctuation / p.avgIndex) * 100 : 0;
      return p;
    },
    /* initialize p */
    function () {
      return {
        count: 0,
        absGain: 0,
        fluctuation: 0,
        fluctuationPercentage: 0,
        sumIndex: 0,
        avgIndex: 0,
        percentageGain: 0
      };
    }
  );
  var fluctuationGroup = **.group();

  yearChart /* dc.barChart('#volume-month-chart', 'chartGroup') */
    .width(420)
    .height(180)
    .margins({top: 10, right: 50, bottom: 30, left: 40})
    .dimension(fluctuation)
    .group(fluctuationGroup)
    .elasticY(true)
    .filterPrinter(function (filters) {
      var filter = filters[0], s = '';
      s += numberFormat(filter[0]) + '% -> ' + numberFormat(filter[1]) + '%';
      return s;
    });
  dc.renderAll();

});