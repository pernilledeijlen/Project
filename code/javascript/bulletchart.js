/*
* Pernille Deijlen
* 10747354
* In this file you will find the functions for making and updating the bulletchart.
*/

// data for bullet for right year and country
function dataMakeBulletchart(error, dataBullet1) {
	var country = dataBullet1[6]
	// als deze ranges en markers die gemiddelde, min/max zijn dan ff een var met calculate aanmaken
	var dataBullet2 = [
		{"title":, "subtitle":, "ranges":[], "measures":[dataBullet1[0]], "markers":[]},
		{"title":, "subtitle":, "ranges":[], "measures":[dataBullet1[1]], "markers":[]},
		{"title":, "subtitle":, "ranges":[], "measures":[dataBullet1[2]], "markers":[]},
		{"title":, "subtitle":, "ranges":[], "measures":[dataBullet1[3]], "markers":[]},
		{"title":, "subtitle":, "ranges":[], "measures":[dataBullet1[4]], "markers":[]},
		{"title":, "subtitle":, "ranges":[], "measures":[dataBullet1[5]], "markers":[]}
	]

	makeBulletchart(error, dataBullet2, country)
};



// making bulletchart for chosen year and country or circle clicked
function makeBulletchart(error, bulletData, country) {
	if (error) throw error;

	// gemiddelde met een zwart streepje aangeven
	// dan min en max een kleur geven dus min naar links en max naar rechts, 3 kleuren dus
	// dan een bar met de actual value voor dat land
	
	// "update functie"
	d3.select("#countrytitle").selectAll("h3").remove()
	d3.select("#bullet").selectAll("svg").remove()
	
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
		.data(bulletData)
		.enter()
		.append("svg")
		.attr("class", "bulletchart")
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

	d3.select("#countrytitle")
	    .append("h3")
	    .attr('x', 100)
	    .attr('y', 10)
	    .text(country);



};