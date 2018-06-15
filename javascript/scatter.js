/*
* Pernille Deijlen
* 10747354
*/

//default year 2008
function makeScatter(error, data){
	if (error) throw error;

	// setting the size of the canvas
	var margin = {top: 20, right: 20, bottom: 40, left: 200}
	var totalWidth = 400
	var totalHeight = 300
	var width = totalWidth - margin.left - margin.right
	var height = totalHeight - margin.top - margin.bottom
	
	// creating svg
	var svg = d3.select("#scatter")
		.append("svg")
		.attr("height", totalHeight)
		.attr("width", totalWidth);

	// var g = svg.append("g")
	//     .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	// get colors for circles
	var color = d3.scale.ordinal(d3.schemeCategory20);

	// scaling the x-axis
	var xScale = d3.scale.linear()
		.domain([0, d3.max(data, function(d) {return d[0];})])
		// .range([margin.right, width - margin.left])
		.range([margin.left, totalWidth])
		// .nice();

	// scaling the y-axis
	var yScale = d3.scale.linear()
        .domain([0, d3.max(data, function(d) {return d[1];})])
        .range([height - margin.bottom, margin.top])
        // .nice();

    // creating circles
	svg.selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
            .attr("cx", function(d) {return xScale(d[0]);})
            .attr("cy", function(d) {return yScale(d[1]);})
            .attr("r", 4)
            // .style("fill", function(d) {return color(d);});
        	.style("fill", "deepskyblue");

    // svg.selecAll("circle")
    // 	.on("mouseover", functionn)
    // 	.on("mouseout", functionnout)

	// var xAxis = d3.svg.axis()
	// 	.scale(xScale)
	// 	.orient("bottom")
	// 	.ticks(4);

 //    // creating the x axis
 //    g.append("g")
 //        .attr("class", "axis")
 //        .attr("transform", "translate(" + (-margin.left) + "," + (height - margin.right) + ")") 
 //        .call(xAxis);

 //    g.append("text")
 //    	.attr("class", "text")
 //    	.attr("x", margin.left)
 //    	.attr("y", height + margin.top)
 //    	.style("text-anchor", "end")
 //    	.text("amount of babies born in YEAR");
	
	// var yAxis = d3.svg.axis()
	// 	.scale(yScale)
	// 	.orient("left")
	// 	.ticks(4);

 //   	// creating the y axis
	// g.append("g")
 //        .attr("class", "axis")
 //        .attr("transform", "translate(" + (width - margin.left - margin.left) + (-margin.right) + ")")
 //        .call(yAxis);

 //   	g.append("text")
 //   		.attr("class", "text")
 //   		.attr("transform", "rotate(-90)")
 //    	.attr("x", margin.top)
 //    	.attr("y", width - margin.left - 160)
 //    	.style("text-anchor", "end")
 //    	.text("afhankelijk van dataset");		
};