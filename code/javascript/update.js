/*
* Pernille Deijlen
* 10747354
*/

// var slider = d3.select("#myRange")
// var output = d3.select("#demo")
// output.html(slider.value)

// slider.on("input", function() {
// 	output.html(this.value)
// 	console.log(mapData)
// 	console.log(this.value)
// })


function updateSliderScatter(error) {
	if (error) throw error;

	var slider = d3.select(".slider")
	var output = d3.select("#demo")
	output.html(slider.value)
	console.log(slider.value)
	//output klopt niet of slider.value
	updateClickScatter(error, slider.value)

	// Update the current slider value
	slider.on("input", function() {
	   	output.html(this.value)
		console.log(mapData)
		console.log(this.value)

	    if (d3.select("#pop").property("checked") == true) {
			updateScatter(error, datasetPop[this.value - 2008], "pop", "city population (in millions)", this.value)
		}
		if (d3.select("#size").property("checked") == true) {
			updateScatter(error, datasetSize[this.value - 2008], "size", "city size (in km2)", this.value)
		}
		updateClickScatter(error, this.value)
		updateSliderMap(error, this.value)
	});
};

function updateClickScatter (error, year){
	if (error) throw error;

	d3.select("#pop").on("click", function() {
		updateScatter(error, datasetPop[year - 2008], "pop", "city population (in millions)", year)
	});

	d3.select("#size").on("click", function() {
		updateScatter(error, datasetSize[year - 2008], "size", "city size (in km2)", year)
	});
};

function updateSliderMap(error, year) {
	if (error) throw error;

	d3.select("#map").empty()
	makeMap(error, mapData[year - 2008])
};