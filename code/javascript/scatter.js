/*
* Pernille Deijlen
* 10747354
* In this file you will find the functions for making and updating the scatterplot.
*/

// making scatterplot with default year 2008 and y axis population
function makeScatter(error, data){
	if (error) throw error;

	// setting the size of the canvas
	var margin = {top: 40, right: 100, bottom: 60, left: 100};
	var totalWidth = 600;
	var totalHeight = 400;
	var width = totalWidth - margin.left - margin.right;
	var height = totalHeight - margin.top - margin.bottom;
	
	// creating svg
	var svg = d3.select("#scatter")
		.append("svg")
		.attr("height", totalHeight)
		.attr("width", totalWidth);

	// max value for all years for amount of babies born and city population
	var babies = [];
	var pop = [];
	for (var i = 0; i < datasetPop.length; i++) {
		for (var j = 0; j < datasetPop[i].length; j++) {
			if (isNaN(datasetPop[i][j][0]) == false) {
				babies.push(datasetPop[i][j][0]);
			};
			if (isNaN(datasetPop[i][j][1]) == false) {
				pop.push(datasetPop[i][j][1])
			};
		};
	};
	
	// max x value
	var xMax = Math.ceil(d3.max(babies) / 10000) * 10;
	
	// max y value
	var yMax = Math.ceil(d3.max(pop) / 1000000);
	
	// scaling the x axis
	var xScale = d3.scale.linear()
		.domain([0, xMax])
		.range([margin.left, totalWidth - margin.right]);

	// scaling the y axis
	var yScale = d3.scale.linear()
        .domain([0, yMax])
        .range([totalHeight - margin.bottom, margin.top]);

	// made my own logical color scale
	var paletteScale = d3.scale.threshold()
		.domain([10000, 20000, 30000, 40000])
		.range(["#d4b9da", "#c994c7", "#df65b0", "#dd1c77", "980043"]);

    // creating circles
	svg.selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
        	.attr("id", function(d) {
        		return d[2];
        	})
            .attr("cx", function(d) {
            	return xScale(d[0] / 1000);
            })
            .attr("cy", function(d) {
            	return yScale(d[1] / 1000000);
            })
            .attr("r", function(d) {
            	if (isNaN(d[0]) == true) {
            		return 0;
            	}
            	else {
            		return 4;
            	}})            	
        	.style("fill", function(d) {
        		return paletteScale(d[0]);
        	});

	// function for hovering over circles
    svg.selectAll("circle")
    	.on("mouseover", mouseOverScatter)
    	.on("mouseout", mouseOutScatter);

	// create x axis
	var xAxis = d3.svg.axis()
		.scale(xScale)
		.orient("bottom")
		.ticks(4);

	svg.append("g")
		.attr("class", "x-axis")
	    .attr("transform", "translate(0," + (totalHeight - margin.bottom) + ")")
	    .call(xAxis);
	
	// create y axis
	var yAxis = d3.svg.axis()
			.scale(yScale)
			.orient("left")
			.ticks(5);

	svg.append("g")
		.attr("class", "y-axis")
	    .attr("transform", "translate(" + (margin.left) + ", 0)")
	    .call(yAxis);

    // text x axis
    svg.append("text")
    	.attr("class", "x-text")
    	.attr("x", totalWidth - margin.right)
    	.attr("y", totalHeight - 10)
    	.style("text-anchor", "end")
    	.text("number of births (in thousands)");

 	// text y axis
   	svg.append("text")
   		.attr("class", "y-text")
    	.attr("x", 25)
    	.attr("y", 20)
    	.style("text-anchor", "left")
    	.text("city population (in millions)");	
};

// updating scatterplot for chosen year and y axis
function updateScatter(error, data, yvalue, text) {
	if (error) throw error;

	// setting the size of the canvas
	var margin = {top: 40, right: 100, bottom: 60, left: 100};
	var totalWidth = 600;
	var totalHeight = 400;
	var width = totalWidth - margin.left - margin.right;
	var height = totalHeight - margin.top - margin.bottom;

	var svg = d3.select("#scatter").select("svg")
	
	// max value for all years for city population
	var pop = [];
	for (var i = 0; i < datasetPop.length; i++) {
		for (var j = 0; j < datasetPop[i].length; j++) {
			if (isNaN(datasetPop[i][j][1]) == false) {
				pop.push(datasetPop[i][j][1]);
			};
		};
	};
	
	// max value for all years for city size
	var size = [];
	for (var i = 0; i < datasetSize.length; i++) {
		for (var j = 0; j < datasetSize[i].length; j++) {
			if (isNaN(datasetSize[i][j][1]) == false) {
				size.push(datasetSize[i][j][1])
			}
		}
	};
	
	// max y value
	var yMaxPop = Math.ceil(d3.max(pop) / 1000000);
	var yMaxSize = Math.ceil(d3.max(size) / 1000);
	
	// max x value, acces global array
	var xMax = Math.ceil(d3.max(infoBullet[6][0]) / 10000) * 10;

	// max value for y axis
	var yMax;
	if (yvalue == "pop") {
		yMax = yMaxPop;
	}

	if (yvalue == "size") {
		yMax = yMaxSize;
	}

	// scaling the x-axis
	var xScale = d3.scale.linear()
		.domain([0, xMax])
		.range([margin.left, totalWidth - margin.right]);

	// scaling the y-axis
	var yScale = d3.scale.linear()
        .domain([0, yMax])
        .range([totalHeight - margin.bottom, margin.top]);

	// colorscale
	var paletteScale = d3.scale.threshold()
		.domain([10000, 20000, 30000, 40000])
		.range(["#d4b9da", "#c994c7", "#df65b0", "#dd1c77", "980043"]);

    // creating circles
	svg.selectAll("circle")
        .data(data)
        .transition()
        .duration(function(d) {
        	if (isNaN(d[0]) == true) {
        		return 0;
        	}
        	else {
        		return 600;
        	}})
        .attr("cx", function(d) {
        	return xScale(d[0] / 1000);
        })
        .attr("cy", function(d) {
			if (yvalue == "pop") {
				return yScale(d[1] / 1000000);
			}
			if (yvalue == "size") {
				return yScale(d[1] / 1000);
			}})
        .attr("r", function(d) {
        	if (isNaN(d[0]) == true) {
        		return 0;
        	}
        	else {
        		return 4;
        	}})            	
        	.style("fill", function(d) {
        		return paletteScale(d[0]);
        	});

    // function for hovering over circles
    svg.selectAll("circle")
    	.on("mouseover", mouseOverScatter)
    	.on("mouseout", mouseOutScatter);
	
	// create y axis with different ticks
	if (yvalue == "pop") {
		var yAxis = d3.svg.axis()
			.scale(yScale)
			.orient("left")
			.ticks(5);
	}
	else {
		var yAxis = d3.svg.axis()
			.scale(yScale)
			.orient("left")
			.ticks(3);
	};

	svg.select(".y-axis")
		.transition()
		.duration(600)
		.call(yAxis);

    svg.select(".y-text")
    	.transition()
    	.duration(600)
    	.text(text);
};
