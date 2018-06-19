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

	var svg = d3.select("#legend");

	var labels = ['0-10000', '10000-20000', '20000-30000', '30000-40000', '> 40000'];
	var colors = ["#d4b9da", "#c994c7", "#df65b0", "#dd1c77", "#980043"];
	var data = [10, 40, 70, 90, 120]

	var henk = svg.append("svg").append("g").selectAll(".legendBoxes")
		.data(data)
		.enter().append("g")
		.attr("class", "legendBoxes")
		
	henk.append("rect")
		.attr("fill", function(d, i){return colors[i];})
		.attr("width", 40)
		.attr("height", 20)
		.attr("x", "20")
		.attr("y", function(d){return d + 30;})

	henk.append("text")
	    .attr("class", "caption")
	    .attr("x", 50)
	    .attr("y", 15)
	    .text("Babies born");

	henk.append("text")
		.text(function(d, i){return labels[i];})
		.attr("x", "70")
		.attr("y", function(d){return d + 45;})


};

// updating map for slider year
function updateMap(error, year) {
	if (error) throw error;

	map.updateChoropleth(mapData[year - 2008]);
};