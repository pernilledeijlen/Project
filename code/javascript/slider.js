/*
* Pernille Deijlen
* 10747354
* In this file you will find the functions for updating the data for the slider year
* and the chosen y variable for the scatterplot.
*/

// updating map and scatterplot for slider value
function updateSlider(error) {
	if (error) throw error;

	var slider = d3.select("#myRange");
	var output = d3.select("#demo");
	// nu gehardcoded default slider value
	var defaultSliderValue = 2008;

	output.html(defaultSliderValue);
	// choosing y axis scatterplot
	updateRadio(error, defaultSliderValue);

	// interactivity map and bullet
	clickMapBullet(error, defaultSliderValue);

	// interactivity scatter and bullet
	clickScatterBullet(error, defaultSliderValue);

	// current slider value
	slider.on("input", function() {
		var year = this.value
	   	output.html(year)

	   	// check which y axis was chosen for scatter
	    if (d3.select("#pop").property("checked") == true) {
			updateScatter(error, datasetPop[year - defaultSliderValue], "pop", "city population (in millions)");
		}
		else {
			updateScatter(error, datasetSize[year - defaultSliderValue], "size", "city size (in thousand km2)");
		};
		// updating with choosing y axis
		updateRadio(error, year);
		
		// updating map with current year
		updateMap(error, year);

		// updating bulletchart with current year
		var country = d3.select("#countrytitle")[0][0].textContent.split(":")[0]
		for (var i = 0; i < bulletData[year - defaultSliderValue].length; i++) {
			if (bulletData[year - defaultSliderValue][i][6] == country) {
				dataMakeBulletchart(error, bulletData[year - defaultSliderValue][i], year);
			};
		};
		
		// updating bulletchart when map or scatter clicked with current year
		clickMapBullet(error, year);
		clickScatterBullet(error, year);
	});
};

// updating scatterplot for radio value
function updateRadio (error, year){
	if (error) throw error;

	var defaultSliderValue = 2008;

	d3.select("#pop").on("click", function() {
		updateScatter(error, datasetPop[year - defaultSliderValue], "pop", "city population (in millions)");
	});

	d3.select("#size").on("click", function() {
		updateScatter(error, datasetSize[year - defaultSliderValue], "size", "city size (in thousand km2)");
	});
};
