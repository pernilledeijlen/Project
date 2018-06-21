/*
* Pernille Deijlen
* 10747354
* In this file you will find the functions for making and updating the bulletchart.
*/

// data for bullet for right year and country
function dataMakeBulletchart(error, data) {
	if (error) throw error;

	var country = data[6]
	var city = data[7]

	// marker een streepje die het gemiddelde aangeeft van dat jaar van alle landen
	// ranges zijn de kleuren, de min en max van dat jaar verdeeld de balk in 3 delen
	// nu gemiddelde en min en max gehardcoded voor het jaar 2008
	var dataBullet = [
		{"title":"babies born", "subtitle":"hello", "ranges":[1101,198719,200000], "measures":[data[0]], "markers":[22557]},
		{"title":"CO2", "subtitle":"emissions per capita in tonnes", "ranges":[5.1,15.78,16], "measures":[data[1]], "markers":[9.76]},
		{"title":"GDP", "subtitle":"per capita in US $", "ranges":[35845.51,63065.8,65000], "measures":[data[2]], "markers":[49041.01]},
		{"title":"green area", "subtitle":"square meters per million people ", "ranges":[0.96,1468.15,1600], "measures":[data[3]], "markers":[333.28]},
		{"title":"population density", "subtitle":"people per km2", "ranges":[994.48,7657.80,8000], "measures":[data[4]], "markers":[2870.99]},
		{"title":"education", "subtitle":"proportion of popluation aged 25-64 qualified at level 5 to 8 ISCED", "ranges":[24.2,50.1,55], "measures":[data[5]], "markers":[41.35]}
	]
	if (data[0] != 0) {
		makeBulletchart(error, dataBullet, country, city)
	}
	else {
		d3.select("#countrytitle").selectAll("h3").remove()
		d3.select("#bullet").selectAll("svg").remove()
		d3.select("#countrytitle")
		    .append("h3")
		    .attr('x', 100)
		    .attr('y', 10)
		    .text("Sorry there is no data available for " + city + ", " + country + " for this year");
	};
};

// making bulletchart for chosen year and country or circle clicked
function makeBulletchart(error, data, country, city) {
	if (error) throw error;
	
	// "update functie"
	d3.select("#countrytitle").selectAll("h3").remove()
	d3.select("#bullet").selectAll("svg").remove()
	
	// even kijken hoe en wat
	var margin = {top: 5, right: 40, bottom: 20, left: 120};
	var width = 800 - margin.left - margin.right;
	var height = 50 - margin.top - margin.bottom;

	var chart = d3.bullet()
		.width(width)
		.height(height)

	var svg = d3.select("#bullet").selectAll("svg")
		.data(data)
		.enter()
		.append("svg")
		.attr("class", "bullet")
		.attr("width", width + margin.left + margin.right)
		.attr("height", height + margin.top + margin.bottom)
		.append("g")
		.attr("transform", "translate(" + margin.left + "," + margin.top + ")")
		.call(chart)

	var title = svg.append("g")
		.style("text-anchor", "end")
		.attr("transform", "translate(-6," + height / 2 + ")");

	title.append("text")
		.attr("class", "title")
		.text(function(d) { return d.title; });

	title.append("text")
		.attr("class", "subtitle")
		.attr("dy", "1em")
		.text(function(d) { return d.subtitle; });

	// hover over title tooltip with more explanaiton about it

	d3.select("#countrytitle")
	    .append("h3")
	    .attr('x', 100)
	    .attr('y', 10)
	    .text(country + ": " + city);
};