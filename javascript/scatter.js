/*
* Pernille Deijlen
* 10747354
*/

//default year 2008
function makeScatter(error){
	if (error) throw error;

	// setting the size of the canvas
	var margin = {top: 20, right: 20, bottom: 40, left: 200}
	var totalWidth = 400
	var totalHeight = 300
	var width = totalWidth - margin.left - margin.right
	var height = totalHeight - margin.top - margin.bottom
	
	var body = d3.select("body");

	// creating svg
	var svg = body.append("svg")
	    .attr("height", totalHeight)
	    .attr("width", totalWidth);

	var g = svg.append("g")
	    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	// get colors for dots
	// var color = d3.scaleOrdinal(d3.schemeCategory20);
		
};