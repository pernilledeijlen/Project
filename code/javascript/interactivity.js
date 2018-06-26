/*
* Pernille Deijlen
* 10747354
* In this file you will find all the functions for interactivity between visualisations.
*/


// functions for scatterplot
// tooltip when hovering over circle, attr tooltip x and y ff apart
function mouseOverScatter(d) {
	var circle = this;

	// make circle bigger
	d3.select(circle)
		.attr("r", 8);
	
	// add tooltip text
	if (d3.select("#pop").property("checked") == true) {
		d3.select("#scatter").select("svg")
			.append("text")
			.attr({id: "tooltipscatter", x: 110, y: 40})
		   	.text(d[4] + " has a population of " + d[1] + " and " + d[0] + " babies have been born")
	};

	if (d3.select("#size").property("checked") == true) {
		d3.select("#scatter").select("svg")
			.append("text")
			.attr({id: "tooltipscatter", x: 110, y: 40})
		   	.text(d[4] + " is " + d[1] + " km2 and " + d[0] + " babies have been born")
	};
	
	// make other circles lighter
	d3.selectAll("circle")
		.style("opacity", function() {
			if (circle != this) { return 0.4}
		});

	mouseOverScatterMap(circle);
	mouseOutScatterMap();
};

// removing tooltip when hovering over circle
function mouseOutScatter() {
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
};

// when hovering over country on the map light up corresponding circle in scatterplot
function mouseOverMapScatter() {
	d3.selectAll("#map").on("mouseover", function() {
		if (d3.select(d3.event.target)["0"]["0"].nodeName == "path"){
			var countryid = d3.select(d3.event.target).data()[0].id
			var circle = d3.select("#scatter").select("svg").selectAll("circle")[0]

			for (var i = 0; i < 21; i++) {
				// make other circles lighter
				if (circle[i].id != countryid) {
					d3.select(circle[i])
						.style("opacity", 0.2)
				}
				// make corresponding circle larger
				else {
					// check if value of circle is not NaN
					if (isNaN(circle[i].__data__[0]) == false) {
						d3.select(circle[i])
							.attr("r", 8)
					}
				}
			}
		}
	});
};

// make all circles normal again
function mouseOutMapScatter() {
	d3.selectAll("#map").on("mouseout", function() {
		var circle = d3.select("#scatter").select("svg").selectAll("circle")[0]
		
		// circles back to normal size
		for (var i = 0; i < 21; i++) {
			// 	make circles smaller
			if (circle[i].attributes.r.value == "8") {
				d3.select(circle[i])
					.transition().delay(200)
					.attr("r", 4);
			}
		}

	    // circles normal opacity again
	    d3.selectAll("circle")
			.style("opacity", 1);
	});
};

// when hovering over rect of legend light up corresponding circles in scatterplot
function mouseOverLegendScatter(rect) {
	var rectColor = d3.select(rect).attr("fill")
	var circle = d3.select("#scatter").select("svg").selectAll("circle")[0]

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
		if (circle[i].style.fill == rgb) {
			d3.select(circle[i])
				.attr("r", 8)
				.style("opacity", 1);
		}
		else {
			d3.select(circle[i])
				.style("opacity", 0.2)
		}
	}
};

// make all circles normal again
function mouseOutLegendScatter(rect) {
	var circle = d3.select("#scatter").select("svg").selectAll("circle")[0]

	// circles back to normal size
	for (var i = 0; i < circle.length; i++) {
		// 	make circles smaller
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


// functions for legend
// when hovering over legend make rect bigger and other rects lighter
function mouseOverLegend() {
	var rect = this;

	// make rects bigger
	d3.select(rect)
		.attr("width", 30)
		.attr("height", 20)

	d3.selectAll("rect")
		.style("opacity", function() {
			if (rect != this) {
				return 0.2
			}})

	mouseOverLegendScatter(rect)
	mouseOverLegendMap(rect)
};

// make all rects of legend normal again
function mouseOutLegend() {
	var rect = this;

	d3.select(rect)
		.transition().delay(200)
	    .attr("width", 25)
		.attr("height", 15)

	d3.selectAll("rect")
		.style("opacity", 1)

	mouseOutLegendScatter(rect)
	mouseOutLegendMap(rect)
};



// functions for map
// when hovering over legend highlight corresponding countries
function mouseOverLegendMap(rect) {
	var rectColor = d3.select(rect).attr("fill")
	country = d3.select(".datamap")[0][0].childNodes[0].childNodes

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
		if (country[i].style.fill != rgb) {
			d3.select(country[i])
				.style("opacity", 0.2)
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
	circleId = circle.id;
	country = d3.select(".datamap")[0][0].childNodes[0].childNodes;

	for (var i = 0; i < country.length; i++){
		if (circle.id != country[i].__data__.id) {
			d3.select(country[i])
				.style("opacity", 0.2);				
		};
	};
};

// make all countries normal again
function mouseOutScatterMap() {
	// country = d3.select(".datamap")[0][0].childNodes[0].childNodes;

	// for (var i = 0; i < country.length; i++) {
	// 	// countries normal opacity again
	// 	d3.select(country[i])
	// 		.style("opacity", 1);
	// }; 
};

// functions for bullet
// when you click on a country show corresponding bulletchart
function clickMapBullet(error, year) {
	d3.selectAll("#map").on("click", function() {
		var country = d3.select(d3.event.target).data()[0].properties.name

		// nog steeds default 2008
		for (var i = 0; i < bulletData[year - 2008].length; i++) {
			if (bulletData[year - 2008][i][6] == country) {
				dataMakeBulletchart(error, bulletData[year - 2008][i])
			}
		}
	});
};

// when you click on a circle show corresponding bulletchart
function clickScatterBullet(error, year) {
	var circles = d3.select("#scatter").select("svg").selectAll("circle")[0]
	d3.selectAll("circle").on("click", function() {
		var circle = this
		var country = d3.select(circle)[0][0].__data__[3]

		for (var i = 0; i < bulletData[year - 2008].length; i++) {
			if (bulletData[year - 2008][i][6] == country) {
				dataMakeBulletchart(error, bulletData[year - 2008][i])

			};
		};
	});
};