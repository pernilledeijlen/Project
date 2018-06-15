/*
* Pernille Deijlen
* 10747354
*/

// getElementsByClassName
// getElementById
// default year is 2008, met slider kan je 2008-2014
function makeMap(error, babies) {
	if (error) throw error;

	var map = new Datamap({
		element: document.getElementById("map"),
		fills: { defaultFill: "lightgrey" },
		setProjection: function(element) {
			width = 500;
			height = 300;
			var projection = d3.geo.mercator()
			   	.center([13, 54])
			   	.translate([width / 2, height / 2])
			   	.scale([width / 1.5]);
			var path = d3.geo.path()
	 			.projection(projection);
			return {path: path, projection: projection};
 		},
 		geographyConfig: {
			borderWidth: 1.3,
			borderOpacity: 1,
			borderColor: "white",
			popupTemplate: function(geo, data) {
			// don't show tooltip if there is no data for that country
			if (!data) { return ; }
				return ['<div class="hoverinfo">',
	                '<strong>', geo.properties.name, '</strong>',
	                '<br>Capital: <strong>', data.city, '</strong>',
	                '<br>Babies born: <strong>', data.value, '</strong>',
	                '</div>'].join('');},
			popOnHover: true,
			highlightOnHover: true,
			highlightFillColor: function(geo) {return geo["fillColor"] || "lightgrey"; },
			highlightBorderColor: "white",
			highlightBorderWidth: 4,
			highlightBorderOpacity: 1
		},
		data: babies,
	});
};



// nieuwe idee: maak een functie voor een basic map vervolgens een update functie
// die oude data eerst verwijdert en vervolgens nieuwe data toevoegt
// function makeMap(error) {
// 	if (error) throw error;

// 	var map = new Datamap({
// 		element: document.getElementById("map"),
// 		fills: { defaultFill: "lightgrey" },
// 		setProjection: function(element) {
// 			width = 500;
// 			height = 300;
// 			var projection = d3.geo.mercator()
// 			   	.center([13, 54])
// 			   	.translate([width / 2, height / 2])
// 			   	.scale([width / 1.5]);
// 			var path = d3.geo.path()
// 	 			.projection(projection);
// 			return {path: path, projection: projection};
//  		},
//  		geographyConfig: {
// 			borderWidth: 1.3,
// 			borderOpacity: 1,
// 			borderColor: "white",
// 			popOnHover: true,
// 			highlightOnHover: true,
// 			highlightBorderColor: "white",
// 			highlightBorderWidth: 4,
// 			highlightBorderOpacity: 1
// 		},
// 	});
// };

// function updateMap(error, babies) {
// 	remove previous shit
// 	data: babies,

// };

// // default 2008
// updateMap(error, babiessss[0])


// 			popupTemplate: function(geo, data) {
// 			// don't show tooltip if there is no data for that country
// 			if (!data) { return ; }
// 				return ['<div class="hoverinfo">',
// 	                '<strong>', geo.properties.name, '</strong>',
// 	                '<br>Capital: <strong>', data.city, '</strong>',
// 	                '<br>Babies born: <strong>', data.value, '</strong>',
// 	                '</div>'].join('');},
// 			popOnHover: true,
// 			highlightOnHover: true,
// 			highlightFillColor: function(geo) {return geo["fillColor"] || "lightgrey"; },
// 			highlightBorderColor: "white",
// 			highlightBorderWidth: 4,
// 			highlightBorderOpacity: 1
// 		},
// 		data: babies,