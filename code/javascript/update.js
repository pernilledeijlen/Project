/*
* Pernille Deijlen
* 10747354
*/

function updateSlider(error) {
	if (error) throw error;

	var slider = d3.select("#myRange")
	var output = d3.select("#demo")
	// nu gehardcoded
	output.html(2008)
	updateRadio(error, 2008)
	// console.log(slider.value)

	// Update the current slider value
	slider.on("input", function() {
	   	output.html(this.value)

	    if (d3.select("#pop").property("checked") == true) {
			updateScatter(error, datasetPop[this.value - 2008], "pop", "city population (in millions)", this.value)
		}
		if (d3.select("#size").property("checked") == true) {
			updateScatter(error, datasetSize[this.value - 2008], "size", "city size (in km2)", this.value)
		}
		updateRadio(error, this.value)
		updateMap(error, this.value)
	});
};

// updating scatterplot for radio value
function updateRadio (error, year){
	if (error) throw error;

	d3.select("#pop").on("click", function() {
		updateScatter(error, datasetPop[year - 2008], "pop", "city population (in millions)", year)
	});

	d3.select("#size").on("click", function() {
		updateScatter(error, datasetSize[year - 2008], "size", "city size (in km2)", year)
	});
};

// updating map for slider year
function updateMap(error, year) {
	if (error) throw error;

	d3.select("#map").html("")
	makeMap(error, mapData[year - 2008])
};