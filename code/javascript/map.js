/*
* Pernille Deijlen
* 10747354
* In this file you will find the functions for making and updating the map.
*/

// global map variable
var map;

// making map with default year 2008
function makeMap(error, data) {
	if (error) throw error;
	data = data[0];

	map = new Datamap({
		element: document.getElementById("map"),
		fills: { defaultFill: "lightgrey" },
		setProjection: function(element) {
			width = 400;
			height = 600;
			var projection = d3.geo.mercator()
			   	.center([10, 57])
			   	.translate([width / 2, height / 2])
			   	.scale([width / 0.75]);
			var path = d3.geo.path()
	 			.projection(projection);
			return {path: path, projection: projection};
 		},
 		data: data,
 		geographyConfig: {
			borderWidth: 1.3,
			borderOpacity: 1,
			borderColor: "white",
			popupTemplate: function(geo, d) {
				// tooltip for countries
				if (!d) { return ['<div class="hoverinfo">',
		                '<strong>', geo.properties.name, '</strong>',
		                '<br>No data available<strong></strong>',
		                '</div>'].join('');}
		        else {
					return ['<div class="hoverinfo">',
		                '<strong>', geo.properties.name, '</strong>',
		                '<br>Capital: <strong>', d.city, '</strong>',
		                '<br>Births: <strong>', d.value, '</strong>',
		                '</div>'].join('');}},
			popOnHover: true,
			highlightOnHover: true,
			highlightFillColor: function(geo) {
				return geo["fillColor"] || "lightgrey";
			},
			highlightBorderColor: "white",
			highlightBorderWidth: 4,
			highlightBorderOpacity: 1
		}
	});

	// when hovering over map show corresponding circle on scatter
	mouseOverMapScatter();
	mouseOutMapScatter();

	// creating map legend
	var svg = d3.select(".datamap");

	var labels = ["no data", "0 - 10000", "10000 - 20000", "20000 - 30000", "30000 - 40000", "> 40000"];
	var colors = ["lightgrey", "#d4b9da", "#c994c7", "#df65b0", "#dd1c77", "#980043"];
	var dataLegend = [10, 40, 70, 90, 120, 150];

	var legend = svg
	.append("g").selectAll(".legend")
		.data(dataLegend)
		.enter().append("g")
		.attr("class", "legend");
	
	// create legend rects
	legend.append("rect")
		.attr("fill", function(d, i){
			return colors[i];
		})
		.attr("width", 25)
		.attr("height", 15)
		.attr("x", 20)
		.attr("y", function(d, i) {
			return i * 30;
		});

	legend.selectAll("rect")
    	.on("mouseover", mouseOverLegend)
    	.on("mouseout", mouseOutLegend);
	
	// create legend text
	legend.append("text")
		.attr("class", "legendtext")
		.text(function(d, i) {
			return labels[i];
		})
		.attr("x", 55)
		.attr("y", function(d, i) {
			return 13 + i * 30;
		});
};

// updating map for slider year
function updateMap(error, year) {
	if (error) throw error;

	map.updateChoropleth(uberData[year]);
};
