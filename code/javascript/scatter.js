/*
* Pernille Deijlen
* 10747354
*/

//default year 2008 // check de ymax, anders bij size instead of pop
function makeScatter(error, data){
	if (error) throw error;

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

	// max pop van alles = 9942283 en max size van alles = 12089.37
	// scaling the y-axis
	var yScale = d3.scale.linear()
        .domain([0, yMax])
        .range([totalHeight - margin.bottom, margin.top])

	// min and max values amount of babies born for colorscheme (zelf bepaalt, london erg hoge uitschieter)
	var minValue = 1089;
	var maxValue = 38030;

	// create color palette
	var paletteScale = d3.scale.quantize()
		.domain([minValue, maxValue])
		.range(["#f1eef6", "#d7b5d8", "#df65b0", "#ce1256"])

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

    // svg.selecAll("circle")
    // 	.on("mouseover", functionn)
    // 	.on("mouseout", functionnout)
    
      //     .on("mouseover", function(d) {
      //     tooltip.transition()
      //          .duration(200)
      //          .style("opacity", .9);
      //     tooltip.html(d["Cereal Name"] + "<br/> (" + xValue(d) 
	     //    + ", " + yValue(d) + ")")
      //          .style("left", (d3.event.pageX + 5) + "px")
      //          .style("top", (d3.event.pageY - 28) + "px");
      // })
      // .on("mouseout", function(d) {
      //     tooltip.transition()
      //          .duration(500)
      //          .style("opacity", 0);
      // });

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
	    .call(xAxis)

	svg.append("g")
		.attr("class", "axis")
	    .attr("transform", "translate(" + (margin.left) + ", 0)")
	    .call(yAxis)

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

function updateScatter(error, data, yvalue) {
	if (error) throw error;

	// setting the size of the canvas
	var margin = {top: 40, right: 100, bottom: 60, left: 100}
	var totalWidth = 600
	var totalHeight = 400
	var width = totalWidth - margin.left - margin.right
	var height = totalHeight - margin.top - margin.bottom

	svg = d3.select("#scatter").select("svg")

	svg.selectAll("circle").remove()
	svg.selectAll("text").remove()
	svg.selectAll("g").remove()

	// max value axes
	var xMax = Math.ceil(d3.max(data, function(d) {return d[0];}) / 10000)
	
	// if (yvalue == pop) {
	// 	var yMax = Math.ceil(d3.max(data, function(d) {return d[1];}) / 1000000)
	// }

	// if (yvalue == size) {
	// 	var yMax = Math.ceil(d3.max(data, function(d) {return d[1];}) / 10000)
	// 	console.log(yMax)
	// }
	var yMax = Math.ceil(d3.max(data, function(d) {return d[1];}) / 1000)
	console.log(yMax)

	// scaling the x-axis
	var xScale = d3.scale.linear()
		.domain([0, xMax])
		.range([margin.left, totalWidth - margin.right])

	// max pop van alles = 9942283 en max size van alles = 12089.37
	// scaling the y-axis
	var yScale = d3.scale.linear()
        .domain([0, yMax])
        .range([totalHeight - margin.bottom, margin.top])

	// min and max values amount of babies born for colorscheme (zelf bepaalt, london erg hoge uitschieter)
	var minValue = 1089;
	var maxValue = 38030;

	// create color palette
	var paletteScale = d3.scale.quantize()
		.domain([minValue, maxValue])
		.range(["#f1eef6", "#d7b5d8", "#df65b0", "#ce1256"])

    // creating circles
	svg.selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
            .attr("cx", function(d) {return xScale(d[0] / 10000);})
            	
            .attr("cy", function(d) {
				// if (yvalue == pop) {
				// 	return yScale(d[1] / 1000000)
				// }
				// if (yvalue == size) {
					return yScale(d[1] / 1000)})
				// }})
            .attr("r", function(d) {
            	if (isNaN(d[0]) == true) {
            		return 0
            	}
            	else {
            		return 4
            	}})            	
        	.style("fill", function(d) {return paletteScale(d[0]);});


    // svg.selecAll("circle")
    // 	.on("mouseover", functionn)
    // 	.on("mouseout", functionnout)
    
      //     .on("mouseover", function(d) {
      //     tooltip.transition()
      //          .duration(200)
      //          .style("opacity", .9);
      //     tooltip.html(d["Cereal Name"] + "<br/> (" + xValue(d) 
	     //    + ", " + yValue(d) + ")")
      //          .style("left", (d3.event.pageX + 5) + "px")
      //          .style("top", (d3.event.pageY - 28) + "px");
      // })
      // .on("mouseout", function(d) {
      //     tooltip.transition()
      //          .duration(500)
      //          .style("opacity", 0);
      // });

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
	    .call(xAxis)

	svg.append("g")
		.attr("class", "axis")
	    .attr("transform", "translate(" + (margin.left) + ", 0)")
	    .call(yAxis)

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
    	.text("nog even aanpassen")
};

