/*
* Pernille Deijlen
* 10747354
* In this file you will find all the functions for interactivity between visualisations.
*/

// functions for map
// when hovering over legend highlight corresponding countries
function mouseOverLegendMap(rect) {
	// get properties of rect
	var rectColor = d3.select(rect).attr("fill");
	// get properties of country
	country = d3.select(".datamap")[0][0].childNodes[0].childNodes;

	// make hex colors rgb colors
	var rgb;
	if (rectColor == "#d4b9da") {
		rgb = "rgb(212, 185, 218)"
	};
	if (rectColor == "#c994c7") {
		rgb = "rgb(201, 148, 199)"
	};
	if (rectColor == "#df65b0") {
		rgb = "rgb(223, 101, 176)"
	};
	if (rectColor == "#dd1c77") {
		rgb = "rgb(221, 28, 119)"
	};
	if (rectColor == "#980043") {
		rgb = "rgb(152, 0, 67)"
	};

	// make other countries lighter
	for (var i = 0; i < country.length; i++) {
		if (rectColor != "lightgrey") {
			if (country[i].style.fill != rgb) {
				d3.select(country[i])
					.style("opacity", 0.2);
			};
		};
	};
};

// make all countries normal again
function mouseOutLegendMap(rect) {
	country = d3.select(".datamap")[0][0].childNodes[0].childNodes;

	for (var i = 0; i < country.length; i++) {
		// countries normal opacity again
		d3.select(country[i])
			.style("opacity", 1);
	};    
};

// when hovering over scatter highlight corresponding countries
function mouseOverScatterMap(circle) {
	// get properties of circle
	circleId = circle.id;

	// get properties of country
	country = d3.select(".datamap")[0][0].childNodes[0].childNodes;

	// if country does not correspond make it lighter
	for (var i = 0; i < country.length; i++){
		if (circleId != country[i].__data__.id) {
			d3.select(country[i])
				.style("opacity", 0.2);				
		};
	};
};

// make all countries normal again
function mouseOutScatterMap() {
	country = d3.select(".datamap")[0][0].childNodes[0].childNodes;

	for (var i = 0; i < country.length; i++) {
		// countries normal opacity again
		d3.select(country[i])
			.style("opacity", 1);
	}; 
};


// functions for legend
// when hovering over legend make rect bigger and other rects lighter
function mouseOverLegend() {
	// get properties of rect
	var rect = this;

	// make rect bigger
	d3.select(rect)
		.attr("width", 30)
		.attr("height", 20);

	// make other rects lighter RETURN NORMAAL
	d3.selectAll("rect")
		.style("opacity", function() {
			if (rect != this) {
				return 0.2;
			}});

	// functions to highlight corresponding countries on map and scatter
	mouseOverLegendScatter(rect);
	mouseOverLegendMap(rect);
};

// make all rects of legend normal again
function mouseOutLegend() {
	// get properties of rect
	var rect = this;
	
	// make rect normal size again
	d3.select(rect)
		.transition().delay(200)
	    .attr("width", 25)
		.attr("height", 15);

	// make opacity of all rects normal again
	d3.selectAll("rect")
		.style("opacity", 1);

	// functions to highlight corresponding countries on map and scatter
	mouseOutLegendScatter(rect);
	mouseOutLegendMap(rect);
};


// functions for scatterplot
// tooltip when hovering over circle, attr tooltip x and y ff apart
function mouseOverScatter(d) {
	// get properties of circle
	var circle = this;

	// make circle bigger
	d3.select(circle)
		.attr("r", 8);
	
	// add tooltip text if y axis is population
	if (d3.select("#pop").property("checked") == true) {
		d3.select("#scatter").select("svg")
			.append("text")
			.attr({id: "tooltipscatter", x: 110, y: 40})
		   	.text(d[4] + " has a population of " + d[1] + " and " + d[0] +
		   		" babies have been born");
	}

	// add tooltip text if y axis is size
	else {
		d3.select("#scatter").select("svg")
			.append("text")
			.attr({id: "tooltipscatter", x: 110, y: 40})
		   	.text(d[4] + " is " + d[1] + " km2 and " + d[0] +
		   		" babies have been born");
	};
	
	// make other circles lighter
	d3.selectAll("circle")
		.style("opacity", function() {
			if (circle != this) { 
				return 0.4;
			}});

	// function to highlight corresponding country
	mouseOverScatterMap(circle);
};

// removing tooltip when hovering over circle
function mouseOutScatter() {
	// get properties of circle
	var circle = this;

	// circles back to normal size
	d3.select(circle)
		.transition().delay(200)
	    .attr("r", 4);

	// remove tooltip text
    d3.select("#tooltipscatter")
    	.remove();
    
    // circles normal opacity again
    d3.selectAll("circle")
		.style("opacity", 1);

	mouseOutScatterMap();
};

// when hovering over country on the map light up corresponding circle in scatterplot
function mouseOverMapScatter() {
	d3.selectAll("#map").on("mouseover", function() {
		
		// check if it is a country you are hovering over
		if (d3.select(d3.event.target)["0"]["0"].nodeName == "path"){
			
			// get country id
			var countryid = d3.select(d3.event.target).data()[0].id;
			
			// get properties of circle
			var circle = d3.select("#scatter").select("svg").selectAll("circle")[0];
			
			for (var i = 0; i < circle.length; i++) {
				// make other circles lighter
				if (circle[i].id != countryid) {
					d3.select(circle[i])
						.style("opacity", 0.2);
				}
				// make corresponding circle larger
				else {
					// check if value of circle is not NaN
					if (isNaN(circle[i].__data__[0]) == false) {
						d3.select(circle[i])
							.attr("r", 8);
					};
				};
			};
		};
	});
};

// make all circles normal again
function mouseOutMapScatter() {
	d3.selectAll("#map").on("mouseout", function() {
		
		// get properties of circle
		var circle = d3.select("#scatter").select("svg").selectAll("circle")[0];

		// circles back to normal size
		for (var i = 0; i < circle.length; i++) {
			// 	make circles smaller
			if (circle[i].attributes.r.value == "8") {
				d3.select(circle[i])
					.transition().delay(200)
					.attr("r", 4);
			};
		};

	    // circles normal opacity again
	    d3.selectAll("circle")
			.style("opacity", 1);
	});
};

// when hovering over rect of legend light up corresponding circles in scatterplot
function mouseOverLegendScatter(rect) {
	// get color of rect of legend
	var rectColor = d3.select(rect).attr("fill")
	
	// get properties of circle
	var circle = d3.select("#scatter").select("svg").selectAll("circle")[0]

	// make hex colors rgb colors
	var rgb;
	if (rectColor == "#d4b9da") {
		rgb = "rgb(212, 185, 218)"
	}
	if (rectColor == "#c994c7") {
		rgb = "rgb(201, 148, 199)"
	}
	if (rectColor == "#df65b0") {
		rgb = "rgb(223, 101, 176)"
	}
	if (rectColor == "#dd1c77") {
		rgb = "rgb(221, 28, 119)"
	}
	if (rectColor == "#980043") {
		rgb = "rgb(152, 0, 67)"
	}
 
 	for (var i = 0; i < circle.length; i++) {
		// if color corresponds, make circle bigger
		if (rectColor != "lightgrey") {
			if (circle[i].style.fill == rgb) {
				d3.select(circle[i])
					.attr("r", 8)
					.style("opacity", 1); // kan weg????
			}
			// make other circles lighter
			else {
				d3.select(circle[i])
					.style("opacity", 0.2);
			};
		};
	};;
};

// make all circles normal again
function mouseOutLegendScatter(rect) {
	var circle = d3.select("#scatter").select("svg").selectAll("circle")[0]

	// circles back to normal size
	for (var i = 0; i < circle.length; i++) {
		// make circles smaller
		if (circle[i].attributes.r.value == "8") {
			d3.select(circle[i])
				.transition().delay(200)
				.attr("r", 4);
		}
	}

	// circles normal opacity again
    d3.selectAll("circle")
		.style("opacity", 1);
};


// functions for bullet
// when you click on a country show corresponding bulletchart
function clickMapBullet(error, year) {
	d3.selectAll("#map").on("click", function() {
		// get properties of country
		var country = d3.select(d3.event.target).data()[0].properties.name;
		
		// default slider year
		var defaultYear = 2008;
		var data;
		
		// when country clicked create bulletchart
		for (var i = 0; i < bulletData[year - defaultYear].length; i++) {
			if (bulletData[year - defaultYear][i][6] == country) {
				data = bulletData[year - defaultYear][i]
				dataMakeBulletchart(error, bulletData[year - defaultYear][i], year);
			};
		};

		// if country on map has no further data to show, show error
		if (data == undefined) {
			// deleting all bulletchart information
			d3.select("#subtitle").selectAll("h5").remove();
			d3.select("#bullet").selectAll("svg").remove();
			d3.select("#infobullet1").selectAll("p").remove();
			d3.select("#infobullet2").selectAll("p").remove();
			d3.select("#countrytitle").selectAll("h3").remove();
			
			// delete border of information box
			d3.select("#infobullet2")
				.style("opacity", 0);

			// adding title showing no data	
			d3.select("#subtitle")
		    	.append("h5")
			    .text("Sorry there is no data available for " +
			    	 country + ".");
		};
		
	});
};

// when you click on a circle show corresponding bulletchart
function clickScatterBullet(error, year) {
	var circles = d3.select("#scatter").select("svg").selectAll("circle")[0]
	d3.selectAll("circle").on("click", function() {
		// get properties of circle
		var circle = this
		// get properties of country
		var country = d3.select(circle)[0][0].__data__[3]
		
		// default slider year cHECK FF
		var defaultYear = 2008;

		// when circle clicked create bulletchart
		for (var i = 0; i < bulletData[year - defaultYear].length; i++) {
			if (bulletData[year - defaultYear][i][6] == country) {
				dataMakeBulletchart(error, bulletData[year - defaultYear][i], year);
			};
		};
	});
};
// show more information about bar title
function mouseOverBullet(d, data) {
	var hover = this
	var text;
	var value;

	// choose tooltip text based on which title is hovered over
	if (d3.select(hover)[0][0].__data__.title == "births") {
		text = " babies have been born";
		value = dataBullet[0].measures;
	}
	else if (d3.select(hover)[0][0].__data__.title == "CO2") {
		text = " tonnes CO2 emissions per capita";
		value = dataBullet[1].measures;
	}
	else if (d3.select(hover)[0][0].__data__.title == "GDP") {
		text = " US dollars GDP per capita";
		value = dataBullet[2].measures;
	}
	else if (d3.select(hover)[0][0].__data__.title == "green area") {
		text = " square meters of green area per million people";
		value = dataBullet[3].measures;
	}
	else if (d3.select(hover)[0][0].__data__.title == "population density") {
		text = " persons per km2, population density of city area";
		value = dataBullet[4].measures;
	}
	else {
		text = ", proportion of population aged 25-64 qualified at level 5 to 8 ISCED";
		value = dataBullet[5].measures;
	};

	// update subtitle
	if (value != 0) {
		d3.select("#subtitle").selectAll("h5")
			.transition()
	    	.duration(600)
	    	.text(value + text);
	}
	else {
		d3.select("#subtitle").selectAll("h5")
			.transition()
	    	.duration(600)
	    	.text("No data available");
	};
};

// go back to normal subtitle
function mouseOutBullet() {
	// update tooltip
	d3.select("#subtitle").selectAll("h5")
		.transition()
    	.duration(600)
    	.text("Hover over a bar title to see more information!");
};
