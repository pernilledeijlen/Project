/*
* Pernille Deijlen
* 10747354
* In this file you will find the functions for making and updating the bulletchart.
*/

// data for bullet for right year and country
function dataMakeBulletchart(error, data) {
	console.log(data)
	var country = data[6]
	console.log(country)
	var city = data[7]
	console.log(city)

	// marker een streepje die het gemiddelde aangeeft van dat jaar van alle landen
	// ranges zijn de kleuren, de min en max van dat jaar verdeeld de balk in 3 delen
	// nu gemiddelde en min en max gehardcoded voor het jaar 2008
	var dataBullet = [
		{"title":"babies born", "subtitle":"hello", "ranges":[1101,198719], "measures":[data[0]], "markers":[22557]},
		{"title":"CO2", "subtitle":"emissions per capita in tonnes", "ranges":[5.1,15.78], "measures":[data[1]], "markers":[9.76]},
		{"title":"GDP", "subtitle":"per capita in US $", "ranges":[35845.51,63065.8], "measures":[data[2]], "markers":[49041.01]},
		{"title":"green area", "subtitle":"square meters per million people ", "ranges":[0.96,1468.15], "measures":[data[3]], "markers":[333.28]},
		{"title":"population density", "subtitle":"people per km2", "ranges":[994.48,7657.80], "measures":[data[4]], "markers":[2870.99]},
		{"title":"education", "subtitle":"proportion of popluation aged 25-64 qualified at level 5 to 8 ISCED", "ranges":[24.2,50.1], "measures":[data[5]], "markers":[41.35]}
	]

	makeBulletchart(error, dataBullet, country, city)
};



// making bulletchart for chosen year and country or circle clicked
function makeBulletchart(error, data, country) {
	if (error) throw error;

	// gemiddelde met een zwart streepje aangeven
	// dan min en max een kleur geven dus min naar links en max naar rechts, 3 kleuren dus
	// dan een bar met de actual value voor dat land
	
	// // "update functie"
	// d3.select("#countrytitle").selectAll("h3").remove()
	// d3.select("#bullet").selectAll("svg").remove()
	
	// even kijken hoe en wat
	var margin = {top: 5, right: 40, bottom: 20, left: 150};
	var totalWidth = 600;
	var totalHeight = 400;
	var width = totalWidth - margin.left - margin.right;
	var height = totalHeight - margin.top - margin.bottom;

	var chart = d3.bullet()
		.width(width)
		.height(height)

	var svg = d3.select("#bullet").selectAll("svg")
		.data(data)
		.enter()
		.append("svg")
		.attr("class", "bullet")
		.attr("width", totalWidth)
		.attr("height", totalHeight)
	
	svg.append("g")
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

	// d3.select("#countrytitle")
	//     .append("h3")
	//     .attr('x', 100)
	//     .attr('y', 10)
	//     .text(country);
};