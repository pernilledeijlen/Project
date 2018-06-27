/*
* Pernille Deijlen
* 10747354
* In this file you will find the functions for making and updating the bulletchart.
*/

// data for bullet for right year and country
function dataMakeBulletchart(error, data, year) {
	if (error) throw error;

	var country = data[6];
	var city = data[7];
	var defaultYear = 2008;
	
	// calculating mean values
	var meanBabies = d3.mean(infoBullet[0][year - defaultYear]);
	var meanCO2 = d3.mean(infoBullet[1][year - defaultYear]);
	var meanGDP = d3.mean(infoBullet[2][year - defaultYear]);
	var meanGreen = d3.mean(infoBullet[3][year - defaultYear]);
	var meanPopDens = d3.mean(infoBullet[4][year - defaultYear]);
	var meanEduc = d3.mean(infoBullet[5][year - defaultYear]);
	
	// calculating minimum values
	var minBabies = d3.min(infoBullet[0][year - defaultYear])
	var minCO2 = d3.min(infoBullet[1][year - defaultYear])
	var minGDP = d3.min(infoBullet[2][year - defaultYear])
	var minGreen = d3.min(infoBullet[3][year - defaultYear])
	var minPopDens = d3.min(infoBullet[4][year - defaultYear])
	var minEduc = d3.min(infoBullet[5][year - defaultYear])
	
	// calculating maximum values
	var maxBabies = d3.max(infoBullet[0][year - defaultYear]);
	var maxCO2 = d3.max(infoBullet[1][year - defaultYear]);
	var maxGDP = d3.max(infoBullet[2][year - defaultYear]);
	var maxGreen = d3.max(infoBullet[3][year - defaultYear]);
	var maxPopDens = d3.max(infoBullet[4][year - defaultYear]);
	var maxEduc = d3.max(infoBullet[5][year - defaultYear]);

	// calculating maximum range chart using the maximum values of all years together
	var maxRangeBabies = Math.ceil(d3.max(infoBullet[6][0]) / 100000) * 100000 + 20000;
	var maxRangeCO2 = Math.ceil(d3.max(infoBullet[6][1])) + 4;
	var maxRangeGDP = Math.ceil(d3.max(infoBullet[6][2]) / 10000) * 10000;
	var maxRangeGreen = Math.ceil(d3.max(infoBullet[6][3]) / 100) * 100 + 100;
	var maxRangePopDens = Math.ceil(d3.max(infoBullet[6][4]) / 1000) * 1000 + 2000;
	var maxRangeEduc = Math.ceil(d3.max(infoBullet[6][5]) / 10) * 10;

	// get data ready for making bulletchart
	var dataBullet = [
		{"title":"births", "subtitle":"", "ranges":[minBabies,maxBabies,maxRangeBabies], "measures":[data[0]], "markers":[meanBabies]},
		{"title":"CO2", "subtitle":"emissions per capita in tonnes", "ranges":[minCO2,maxCO2,maxRangeCO2], "measures":[data[1]], "markers":[meanCO2]},
		{"title":"GDP", "subtitle":"per capita in US $", "ranges":[minGDP,maxGDP,maxRangeGDP], "measures":[data[2]], "markers":[meanGDP]},
		{"title":"green area", "subtitle":"square meters per million people ", "ranges":[minGreen,maxGreen,maxRangeGreen], "measures":[data[3]], "markers":[meanGreen]},
		{"title":"population density", "subtitle":"people per km2", "ranges":[minPopDens,maxPopDens,maxRangePopDens], "measures":[data[4]], "markers":[meanPopDens]},
		{"title":"education", "subtitle":"proportion of popluation aged 25-64 qualified at level 5 to 8 ISCED", "ranges":[minEduc,maxEduc,maxRangeEduc], "measures":[data[5]], "markers":[meanEduc]}
	];

	// create bulletchart if there is data about births
	if (data[0] != 0) {
		makeBulletchart(error, dataBullet, country, city);
	}

	// show error if there is no baby data
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

// make bulletchart for chosen year and country or circle clicked
function makeBulletchart(error, data, country, city) {
	if (error) throw error;
	
	// "update functie"
	d3.select("#countrytitle").selectAll("h3").remove()
	d3.select("#subtitle").selectAll("h5").remove()
	d3.select("#bullet").selectAll("svg").remove()
	d3.select("#infobullet1").selectAll("p").remove()
	d3.select("#infobullet2").selectAll("p").remove()

	// adding information about bulletchart
	d3.select("#infobullet1")
		.append("p")
		.text("bulletchart");
	d3.select("#infobullet2")
		.append("p")
		.text("In this chart you will find more information on variables that might be of influence \
		 on the amount of births. The black line displays the average value of all cities in that \
		 specific year. The border between dark grey and medium grey displays the minimum value and \
		 the border between medium grey and light grey displays the maximum value. The bar itself \
		 shows the value for each subject for the country selected.");
	
	// add title
	d3.select("#countrytitle")
	    .append("h3")
	    .attr('x', 100)
	    .attr('y', 10)
	    .text(country + ": " + city);

	// add subtitle
	d3.select("#subtitle")
	    .append("h5")
	    .attr('x', 100)
	    .attr('y', 10)
	    .text("Hover over a bar title to see more information!");

	// get margins,  height and width
	var margin = {top: 5, right: 40, bottom: 20, left: 130};
	var width = 800 - margin.left - margin.right;
	var height = 50 - margin.top - margin.bottom;

	// create chart
	var chart = d3.bullet()
		.width(width)
		.height(height);

	// create svg
	var svg = d3.select("#bullet").selectAll("svg")
		.data(data)
		.enter()
		.append("svg")
		.attr("class", "bullet")
		.attr("width", width + margin.left + margin.right)
		.attr("height", height + margin.top + margin.bottom)
		.append("g")
		.attr("transform", "translate(" + margin.left + "," + margin.top + ")")
		.call(chart);

	// add title of bars
	var title = svg.append("g")
		.style("text-anchor", "end")
		.attr("transform", "translate(-6," + height / 2 + ")");

	title.append("text")
		.attr("class", "title")
		.text(function(d) {return d.title;})
		.on("mouseover", mouseOverTitle)
		.on("mouseout", mouseOutTitle);
};

function mouseOverTitle(d) {
	// remove standard tooltip text
	d3.select("#subtitle").selectAll("h5")
		.remove()

	var hover = this
	var text;

	// choose tooltip text based on which title is hovered over
	if (d3.select(hover)[0][0].__data__.title == "births") {
		text = "amount of babies born";
	}

	else if (d3.select(hover)[0][0].__data__.title == "CO2") {
		text = "CO2 emissions per capita in tonnes";
	}
	else if (d3.select(hover)[0][0].__data__.title == "GDP") {
		text = "GDP per capita in US dollars";
	}

	else if (d3.select(hover)[0][0].__data__.title == "green area") {
		text = "green area per million people in square meters";
	}
	else if (d3.select(hover)[0][0].__data__.title == "population density") {
		text = "population density of city area in persons per km2";
	}
	else if (d3.select(hover)[0][0].__data__.title == "education") {
		text = "proportion of population aged 25-64 qualified at level 5 to 8 ISCED";
	};

	// add tooltip subtitle
	d3.select("#subtitle")
		    .append("h5")
		    .attr('x', 100)
		    .attr('y', 10)
		    .text(text);
};

function mouseOutTitle() {
	// remove tooltip subtitle
	d3.select("#subtitle").selectAll("h5")
		.remove()

	// add standard tooltip text
	d3.select("#subtitle")
	    .append("h5")
	    .attr('x', 100)
	    .attr('y', 10)
	    .text("Hover over a bar title to see more information!");
};
