/*
* Pernille Deijlen
* 10747354
* In this file you will find the functions for making and updating the map.
*/

// global map variable
var map;

// making map, default year 2008
function makeMap(error, dataInMakeMap) {
	if (error) throw error;
	console.log(dataInMakeMap);
	dataInMakeMap = dataInMakeMap[0];

	console.log(mapData);

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
 		data: dataInMakeMap,
 		geographyConfig: {
			borderWidth: 1.3,
			borderOpacity: 1,
			borderColor: "white",
			popupTemplate: function(geo, d) {
				// mouseOverMap();
				// tooltip for countries
				if (!d) { return ['<div class="hoverinfo">',
		                '<strong>', geo.properties.name, '</strong>',
		                '<br>No data available<strong></strong>',
		                '</div>'].join('');}
		        else {
					return ['<div class="hoverinfo">',
		                '<strong>', geo.properties.name, '</strong>',
		                '<br>Capital: <strong>', d.city, '</strong>',
		                '<br>Babies born: <strong>', d.value, '</strong>',
		                '</div>'].join('');}},
			popOnHover: true,
			highlightOnHover: true,
			highlightFillColor: function(geo) {return geo["fillColor"] || "lightgrey"; },
			highlightBorderColor: "white",
			highlightBorderWidth: 4,
			highlightBorderOpacity: 1
		}
	});

	// interactivity map and scatter
	mouseOverMapScatter()
	mouseOutMapScatter()

	// creating map legend
	var svg = d3.select(".datamap");

	var labels = ["no data", "0 - 10", "10 - 20", "20 - 30", "30 - 40", "> 40"];
	var colors = ["lightgrey", "#d4b9da", "#c994c7", "#df65b0", "#dd1c77", "#980043"];
	var dataLegend = [10, 40, 70, 90, 120, 150];

	var legend = svg
	.append("g").selectAll(".legend")
		.data(dataLegend)
		.enter().append("g")
		.attr("class", "legend")
		
	legend.append("rect")
		.attr("fill", function(d, i){return colors[i];})
		.attr("width", 25)
		.attr("height", 15)
		.attr("x", 20)
		.attr("y", function(d, i){return i * 30;})

	legend.selectAll("rect")
    	.on("mouseover", mouseOverLegend)
    	.on("mouseout", mouseOutLegend);

	// legend.append("text")
	//     .attr("class", "legendtitle")
	//     .attr("x", 140)
	//     .attr("y", 73)
	//     .text("Babies born in thousands");

	legend.append("text")
		.text(function(d, i){return labels[i];})
		.attr("x", 55)
		.attr("y", function(d, i){return 13 + i * 30;})

	console.log(mapData);
};

// updating map for slider year (er gaat iets mis bij het teruggaan naar 2008)
function updateMap(error, year) {
	if (error) throw error;
	console.log(year - 2008)
	console.log(mapData);
	console.log(mapData[year - 2008])

	map.updateChoropleth(uberData[year]);
};
