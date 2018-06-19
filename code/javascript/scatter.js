/*
* Pernille Deijlen
* 10747354
*/

function makeScatter(error){
	if (error) throw error;

	// default 2008 and city population
	data = datasetPop[0]

	// setting the size of the canvas
	var margin = {top: 40, right: 100, bottom: 60, left: 100}
	var totalWidth = 600
	var totalHeight = 400
	var width = totalWidth - margin.left - margin.right
	var height = totalHeight - margin.top - margin.bottom
	
	// creating svg
	var svg = d3.select("#scatter")
		.append("svg")
		.attr("height", totalHeight)
		.attr("width", totalWidth);

	// max value axes
	var xMax = Math.ceil(d3.max(data, function(d) {return d[0];}) / 10000)
	var yMax = Math.ceil(d3.max(data, function(d) {return d[1];}) / 1000000)
	
	// scaling the x-axis
	var xScale = d3.scale.linear()
		.domain([0, xMax])
		.range([margin.left, totalWidth - margin.right])

	// scaling the y-axis
	var yScale = d3.scale.linear()
        .domain([0, yMax])
        .range([totalHeight - margin.bottom, margin.top])

	// min and max values amount of babies born for colorscheme (zelf bepaalt, london erg hoge uitschieter)
	var minValue = 1089;
	var maxValue = 38030;

	// made my own logical color scale
	var paletteScale = d3.scale.threshold()
		.domain([10000, 20000, 30000, 40000])
		.range(["#d4b9da", "#c994c7", "#df65b0", "#dd1c77", "980043"]);

    // creating circles
	svg.selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
            .attr("cx", function(d) {return xScale(d[0] / 10000);})
            .attr("cy", function(d) {return yScale(d[1] / 1000000);})
            .attr("r", function(d) {
            	if (isNaN(d[0]) == true) {
            		return 0
            	}
            	else {
            		return 4
            	}})            	
        	.style("fill", function(d) {return paletteScale(d[0]);});

    svg.selectAll("circle")
    	.on("mouseover", mouseOver)
    	.on("mouseout", mouseOut);

	var xAxis = d3.svg.axis()
		.scale(xScale)
		.orient("bottom")
		.ticks(4);

	var yAxis = d3.svg.axis()
			.scale(yScale)
			.orient("left")
			.ticks(4);

	svg.append("g")
		.attr("class", "axis")
	    .attr("transform", "translate(0," + (totalHeight - margin.bottom) + ")")
	    .call(xAxis);

	svg.append("g")
		.attr("class", "axis")
	    .attr("transform", "translate(" + (margin.left) + ", 0)")
	    .call(yAxis);

    // text x axis
    svg.append("text")
    	.attr("class", "text")
    	.attr("x", totalWidth - margin.right)
    	.attr("y", totalHeight - 10)
    	.style("text-anchor", "end")
    	.text("amount of babies born (in tens of thousands)");

 	// text y axis
   	svg.append("text")
   		.attr("class", "text")
    	.attr("x", 25)
    	.attr("y", 20)
    	.style("text-anchor", "left")
    	.text("city population (in millions)");	
};

function updateScatter(error, data, yvalue, text) {
	if (error) throw error;

	// setting the size of the canvas
	var margin = {top: 40, right: 100, bottom: 60, left: 100};
	var totalWidth = 600;
	var totalHeight = 400;
	var width = totalWidth - margin.left - margin.right;
	var height = totalHeight - margin.top - margin.bottom;

	svg = d3.select("#scatter").select("svg")

	svg.selectAll("circle").remove()
	svg.selectAll("text").remove()
	svg.selectAll("g").remove()


	// console.log(d3.min(data, function(d) { return d[0]; }));		//x
 //  	console.log(d3.max(data, function(d) { return d[1]; }));		//y
	
	// max value from all years for population
	for (var i = 0; i < 7; i++) {

	} 
	

	// max value from all years for size
	for (var i = 0; i < 7; i++) {

	}
	

	// max value from all years for amount of babies born
	var xMax;
	for (var i = 0; i < 7; i++) {

	}

	// max value for y axis
	var yMax;
	if (yvalue == "pop") {

	}

	if (yvalue == "size") {

	}




	// max value axes
	// var xMax = Math.ceil(d3.max(data, function(d) {return d[0];}) / 10000)

	// max pop van alles = 9942283 en max size van alles = 12089.37 en max babies van alles 198 nog wat

	// hardcoded max values (moet even via code de max van alle data arrays vinden)
	var xMax = 20
	if (yvalue == "pop") {
		var yMax = 10
	}

	if (yvalue == "size") {
		var yMax = 15
	}

	// if (yvalue == "pop") {
	// 	var yMax = Math.ceil(d3.max(data, function(d) {return d[1];}) / 1000000)
	// }

	// if (yvalue == "size") {
	// 	var yMax = Math.ceil(d3.max(data, function(d) {return d[1];}) / 1000)
	// 	console.log(yMax)
	// }
	// // var yMax = Math.ceil(d3.max(data, function(d) {return d[1];}) / 1000)
	// console.log(yMax)

	// scaling the x-axis
	var xScale = d3.scale.linear()
		.domain([0, xMax])
		.range([margin.left, totalWidth - margin.right])

	// max pop van alles = 9942283 en max size van alles = 12089.37
	// scaling the y-axis
	var yScale = d3.scale.linear()
        .domain([0, yMax])
        .range([totalHeight - margin.bottom, margin.top])

	// made my own logical color scale
	var paletteScale = d3.scale.threshold()
		.domain([10000, 20000, 30000, 40000])
		.range(["#d4b9da", "#c994c7", "#df65b0", "#dd1c77", "980043"]);

    // creating circles
	svg.selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
            .attr("cx", function(d) {return xScale(d[0] / 10000);})
            	
            .attr("cy", function(d) {
				if (yvalue == "pop") {
					return yScale(d[1] / 1000000)
				}
				if (yvalue == "size") {
					return yScale(d[1] / 1000)
				}})
            .attr("r", function(d) {
            	if (isNaN(d[0]) == true) {
            		return 0
            	}
            	else {
            		return 4
            	}})            	
        	.style("fill", function(d) {return paletteScale(d[0]);});

    // tooltip
    svg.selectAll("circle")
    	.on("mouseover", mouseOver)
    	.on("mouseout", mouseOut)

	var xAxis = d3.svg.axis()
		.scale(xScale)
		.orient("bottom")
		.ticks(4);

	var yAxis = d3.svg.axis()
			.scale(yScale)
			.orient("left")
			.ticks(4);

	// create x axis
	svg.append("g")
		.attr("class", "axis")
	    .attr("transform", "translate(0," + (totalHeight - margin.bottom) + ")")
	    .call(xAxis);

	// create y axis
	svg.append("g")
		.attr("class", "axis")
	    .attr("transform", "translate(" + (margin.left) + ", 0)")
	    .call(yAxis);

    // text x axis
    svg.append("text")
    	.attr("class", "text")
    	.attr("x", totalWidth - margin.right)
    	.attr("y", totalHeight - 10)
    	.style("text-anchor", "end")
    	.text("amount of babies born (in tens of thousands)");

 	// text y axis
   	svg.append("text")
   		.attr("class", "text")
    	.attr("x", 25)
    	.attr("y", 20)
    	.style("text-anchor", "left")
    	.text(text);
};

// tooltip when hovering over circle
function mouseOver(d) {
	var self = this;

	// make circle bigger
	d3.select(self)
		.attr("r", 8)
	
	// add tooltip text
	if (d3.select("#pop").property("checked") == true) {
		d3.select("#scatter").select("svg")
			.append("text")
			.attr({id: "tooltip", x: 110, y: 40})
		   	.text(d[4] + " has a population of " + d[1] + " and " + d[0] + " babies have been born")}

	if (d3.select("#size").property("checked") == true) {
		d3.select("#scatter").select("svg")
			.append("text")
			.attr({id: "tooltip", x: 110, y: 40})
		   	.text(d[4] + " is " + d[1] + " km2 and " + d[0] + " babies have been born")}

	// make other circles lighter
	d3.selectAll("circle")
		.style("opacity", function() {
			if (self != this) {
				return 0.2
			}})
};

// removing tooltip when hovering over circle
function mouseOut(d) {
	// circles back to normal size
	d3.select(this)
		.transition().delay(300)
	    .attr("r", 4)

	// remove tooltip text
    d3.select("#tooltip")
    	.remove()
    
    // circles normal opcacity again
    d3.selectAll("circle")
		.style("opacity", 1)
};