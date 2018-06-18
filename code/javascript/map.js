/*
* Pernille Deijlen
* 10747354
*/

function makeMap(error, data) {
	if (error) throw error;

	var map = new Datamap({
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
			// .center([13, 54])
			// .translate([width / 2, height / 2])
			// .scale([width / 1.5]);
 		},
 		geographyConfig: {
			borderWidth: 1.3,
			borderOpacity: 1,
			borderColor: "white",
			popupTemplate: function(geo, data) {
			// don't show tooltip if there is no data for that country
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
		},
		data: data,
	});
};