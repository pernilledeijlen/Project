/*
* Pernille Deijlen
* 10747354
*/

// updating map and scatterplot for slider value
function updateSlider(error) {
	if (error) throw error;

	var slider = d3.select("#myRange")
	var output = d3.select("#demo")
	// nu gehardcoded default slider value
	output.html(2008)
	updateRadio(error, 2008)
	// console.log(slider.value)

	// Current slider value
	slider.on("input", function() {
		var year = this.value
	   	output.html(year)

	   	// check which y axis was chosen
	    if (d3.select("#pop").property("checked") == true) {
			updateScatter(error, datasetPop[year - 2008], "pop", "city population (in millions)")
		}
		if (d3.select("#size").property("checked") == true) {
			updateScatter(error, datasetSize[year - 2008], "size", "city size (in km2)")
		}
		updateRadio(error, year)
		updateMap(error, year)
	});
};

// updating scatterplot for radio value
function updateRadio (error, year){
	if (error) throw error;

	d3.select("#pop").on("click", function() {
		updateScatter(error, datasetPop[year - 2008], "pop", "city population (in millions)")
	});

	d3.select("#size").on("click", function() {
		updateScatter(error, datasetSize[year - 2008], "size", "city size (in km2)")
	});
};

// updating map for slider year
// function updateMap(error, year) {
// 	if (error) throw error;

// 	d3.select("#map").html("")
// 	makeMap(error, mapData[year - 2008])
// };