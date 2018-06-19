/*
* Pernille Deijlen
* 10747354
*/

// global map variable
var map;

// making map, default year 2008
function makeMap(error, data) {
	if (error) throw error;

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
			popupTemplate: function(geo, data) {
			// tooltip for countries
			if (!data) { return ['<div class="hoverinfo">',
	                '<strong>', geo.properties.name, '</strong>',
	                '<br>No data available<strong></strong>',
	                '</div>'].join('');}
	        else {
				return ['<div class="hoverinfo">',
	                '<strong>', geo.properties.name, '</strong>',
	                '<br>Capital: <strong>', data.city, '</strong>',
	                '<br>Babies born: <strong>', data.value, '</strong>',
	                '</div>'].join('');}},
			popOnHover: true,
			highlightOnHover: true,
			highlightFillColor: function(geo) {return geo["fillColor"] || "lightgrey"; },
			highlightBorderColor: "white",
			highlightBorderWidth: 4,
			highlightBorderOpacity: 1
		}
	});

	var svg = d3.select("#map");

	var labels = ["no data", "0 - 10", "10 - 20", "20 - 30", "30 - 40", "> 40"];
	var colors = ["lightgrey", "#d4b9da", "#c994c7", "#df65b0", "#dd1c77", "#980043"];
	var data = [10, 40, 70, 90, 120, 150];

	var legend = svg.append("svg").append("g").selectAll(".legend")
		.data(data)
		.enter().append("g")
		.attr("class", "legend")
		
	legend.append("rect")
		.attr("fill", function(d, i){return colors[i];})
		.attr("width", 25)
		.attr("height", 15)
		.attr("x", 20)
		.attr("y", function(d, i){return i * 30;})

	legend.selectAll("rect")
    	.on("mouseover", mouseOverMap)
    	.on("mouseout", mouseOutMap);

	// legend.append("text")
	//     .attr("class", "legendtitle")
	//     .attr("x", 140)
	//     .attr("y", 73)
	//     .text("Babies born in thousands");

	legend.append("text")
		.text(function(d, i){return labels[i];})
		.attr("x", 55)
		.attr("y", function(d, i){return 13 + i * 30;})
};

// updating map for slider year (er gaat iets mis bij het teruggaan naar 2008)
function updateMap(error, year) {
	if (error) throw error;
	console.log(year)
	console.log(mapData[year - 2008])

	map.updateChoropleth(mapData[year - 2008]);
};

function mouseOverMap(d) {
	var self = this;

	// make rects bigger
	d3.select(self)
		.attr("width", 30)
		.attr("height", 20)

	console.log(self.fill)

	d3.selectAll("rect")
		.style("opacity", function() {
			if (self != this) {
				return 0.2
			}})
};

function mouseOutMap(d) {
	var self = this;

	d3.select(self)
		.transition().delay(200)
	    .attr("width", 25)
		.attr("height", 15)

	d3.selectAll("rect")
		.style("opacity", 1)
};