/*
* Pernille Deijlen
* 10747354
*/

//default year 2008
function makeScatter(error, data){
	if (error) throw error;

	// setting the size of the canvas
	var margin = {top: 40, right: 20, bottom: 40, left: 200}
	var totalWidth = 600
	var totalHeight = 400
	var width = totalWidth - margin.left - margin.right
	var height = totalHeight - margin.top - margin.bottom
	
	// creating svg
	var svg = d3.select("#scatter")
		.append("svg")
		.attr("height", totalHeight)
		.attr("width", totalWidth);

	var g = svg.append("g")
	    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	// scaling the x-axis
	var xScale = d3.scale.linear()
		.domain([0, d3.max(data, function(d) {return d[0];})])
		.range([margin.left, totalWidth - margin.right])

	// max pop van alles = 9942283 en max size van alles = 12089.37
	// scaling the y-axis
	var yScale = d3.scale.linear()
        .domain([0, d3.max(data, function(d) {return d[1];})])
        .range([totalHeight - margin.bottom, margin.top])

	// min and max values amount of babies born (zelf bepaalt, london erg hoge uitschieter)
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
            .attr("cx", function(d) {return xScale(d[0]);})
            .attr("cy", function(d) {return yScale(d[1]);})
            .attr("r", 4)
        	.style("fill", function(d) {return paletteScale(d[0])})

    // svg.selecAll("circle")
    // 	.on("mouseover", functionn)
    // 	.on("mouseout", functionnout)

	var xAxis = d3.svg.axis()
		.scale(xScale)
		.orient("bottom")
		.ticks(4);

    // creating the x axis
    g.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(" + (-margin.left) + "," + (height - margin.right) + ")") 
        .call(xAxis);

    g.append("text")
    	.attr("class", "text")
    	.attr("x", margin.left)
    	.attr("y", height + margin.top)
    	.style("text-anchor", "end")
    	.text("amount of babies born in YEAR");
	
	var yAxis = d3.svg.axis()
		.scale(yScale)
		.orient("left")
		.ticks(4);

   	// creating the y axis
	g.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(" + (width - margin.left - margin.left) + (-margin.right) + ")")
        .call(yAxis);

   	g.append("text")
   		.attr("class", "text")
   		.attr("transform", "rotate(-90)")
    	.attr("x", margin.top)
    	.attr("y", width - margin.left - 160)
    	.style("text-anchor", "end")
    	.text("afhankelijk van dataset");	
	
};