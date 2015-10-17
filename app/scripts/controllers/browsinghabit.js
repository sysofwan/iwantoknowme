'use strict';

/**
 * @ngdoc function
 * @name iwantoknowmeApp.controller:BrowsinghabitCtrl
 * @description
 * # BrowsinghabitCtrl
 * Controller of the iwantoknowmeApp
 */
angular.module('iwantoknowmeApp')
  .controller('BrowsinghabitCtrl', function () {
    var data = [
	  { x: 1, x2: 3, y: "Sunday", y2: "Sunday" },
	  { x: 2, x2: 4, y: "Monday", y2: "Monday" },
	  { x: 3, x2: 7, y: "Wednesday", y2: "Wednesday" },
	  { x: 4, x2: 6, y: "Tuesday", y2: "Tuesday" },
	  { x: 5, x2: 7, y: "Thursday", y2: "Thursday" },
	  { x: 5, x2: 7, y: "Saturday", y2: "Saturday" }
	];

	var xScale = new Plottable.Scales.Linear();
  var yScale = new Plottable.Scales.Category()
    .domain(["Sunday", "Saturday", "Friday", "Thursday", "Wednesday", "Tuesday", "Monday"]);

	var xAxis = new Plottable.Axes.Numeric(xScale, "bottom");
	var yAxis = new Plottable.Axes.Category(yScale, "left");

	var label_x = new Plottable.Components.AxisLabel("Time", 0);
	var label_y = new Plottable.Components.AxisLabel("Day", -90);

	var plot = new Plottable.Plots.Segment()
	  .x(function(d) { return d.x; }, xScale)
	  .y(function(d) { return d.y; }, yScale)
	  .x2(function(d) { return d.x2; })
	  .y2(function(d) { return d.y2; })
	  .addDataset(new Plottable.Dataset(data));

	var chart = new Plottable.Components.Table([
    [label_y, yAxis, plot],
    [label_x, null, xAxis]
  ]);

  chart.renderTo("svg#weekanalysis");

	window.addEventListener("resize", function() {
	  plot.redraw();
	});

  });
