/*
* Pernille Deijlen
* 10747354
* In this file you will find the functions for updating the data for the slider year
* and the chosen y variable for the scatterplot.
*/

// updating map and scatterplot for slider value
function updateSlider(error, test) {
	if (error) throw error;

	var slider = d3.select("#myRange")
	var output = d3.select("#demo")
	// nu gehardcoded default slider value
	var defaultSliderValue = 2008

	output.html(defaultSliderValue)
	updateRadio(error, defaultSliderValue)

	// current slider value
	slider.on("input", function() {
		var year = this.value
	   	output.html(year)

	   	// check which y axis was chosen
	    if (d3.select("#pop").property("checked") == true) {
			updateScatter(error, datasetPop[year - defaultSliderValue], "pop", "city population (in millions)")
		}
		if (d3.select("#size").property("checked") == true) {
			updateScatter(error, datasetSize[year - defaultSliderValue], "size", "city size (in km2)")
		}
		updateRadio(error, year)
		updateMap(error, year)
	});
};

// updating scatterplot for radio value
function updateRadio (error, year){
	if (error) throw error;

	var defaultSliderValue = 2008

	d3.select("#pop").on("click", function() {
		updateScatter(error, datasetPop[year - defaultSliderValue], "pop", "city population (in millions)")
	});

	d3.select("#size").on("click", function() {
		updateScatter(error, datasetSize[year - defaultSliderValue], "size", "city size (in km2)")
	});
};
