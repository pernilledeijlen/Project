/*
* Pernille Deijlen
* 10747354
*/


window.onload = function() {

	queue()
		.defer(d3.json, "scripts/babies.json")
		.defer(d3.json, "scripts/education.json")
		.defer(d3.json, "scripts/information.json")
		.defer(d3.json, "scripts/popandsize.json")
		.awaitAll(load);
};

function load(error, data) {
	if (error) throw error;

	var babies = data[0];
	var education = data[1];
	var information = data[2];
	var popandsize = data[3];

	dataMap(error, babies)
	dataScatter(error, babies, popandsize)
};

function dataMap(error, data) {
	if (error) throw error;

	var infoBaby = [];
	var begin = 2;
	
	// data array for each year for map
	for (var i = 0; i < 7; i++) {
		var year = [];
		for (var j = begin; j < 301; j += 10) {
			year.push(data[j])
		}
		begin += 1
		infoBaby.push(year);
	};
	console.log(infoBaby)

	// min and max values amount of babies born
	var minValue = 1089; // math.min()
	var maxValue = 38030; //math.max()

	// create color palette
	var paletteScale = d3.scale.quantize()
		.domain([minValue, maxValue])
		.range(["#f2f0f7", "#cbc9e2", "#9e9ac8", "#6a51a3"])

	var babiessss = [];
	
	for (var i = 0; i < 7; i++) {
		var babiesss = {};
		infoBaby[i].forEach(function(item){
			var countrycode = item["countrycode"]
			var value = item["value"]
			var city = item["city"]
			babiesss[countrycode] = {city: city, value: value, fillColor: paletteScale(value)}
		})
		babiessss.push(babiesss)
	};
	
	// default map for year 2008
	makeMap(error, babiessss[0])
	
	var slider = document.getElementById("myRange");
	var output = document.getElementById("demo");
	output.innerHTML = slider.value; // Display the default slider value

	// Update the current slider value (each time you drag the slider handle)
	slider.oninput = function() {
	    output.innerHTML = this.value;
	    console.log(this.value)
	    $("#map").empty()
	    makeMap(error, babiessss[this.value - 2008])
	};	
};

function dataScatter(error, data1, data2) {
	if (error) throw error;

	var babies = data1;
	var popandsize = data2;

	var totalsize = [];
	var begin1 = 1

	// size array for each year
	for (var i = 0; i < 7; i++) {
		var size = [];
		for (var j = begin1; j < 148; j += 7) {
			size.push(popandsize[j]["value"])
		}
		begin1 += 1
		totalsize.push(size)
	};

	var population = [];
	var begin2 = 148;

	// population array for each year
	for (var i = 0; i < 7; i++) {
		var pop = [];
		for (var j = begin2; j < 295; j += 7) {
			pop.push(popandsize[j]["value"])
		}
		begin2 += 1
		population.push(pop)
	};

	// country array for above datasets
	var countries = [];
	for (var i = 1; i < 295; i +=7) {
		countries.push(popandsize[i]["country"])
	};

	var infoBaby = [];
	var begin = 2;

	// amount of babies born array for each year
	for (var i = 0; i < 7; i++) {
		var baby = [];
		for (var j = begin; j < 301; j += 10) {
			baby.push(babies[j])
		}
		begin += 1
		infoBaby.push(baby);
	};

	// dataset x as babies y as population [[[1, a], [2, b]], [[1, a], [2, b]]]
	// dus datasetPop[0] = 2008, datasetPop[1] = 2009 etc
	var datasetPop = []
	for (var i = 0; i < 7; i++) {
		var datayear = [];
		for (var k = 0; k < 21; k++){
			datapoint = [];
			for (var j = 0; j < 30; j++) {
				if (countries[k] == infoBaby[i][j]["country"]) {
					datapoint.push(parseFloat(infoBaby[i][j]["value"].replace(/[^\d\.\-]/g, "")))
					datapoint.push(parseFloat(population[i][k].replace(/[^\d\.\-]/g, "")))
				}
			}
			datayear.push(datapoint)
		}
		datasetPop.push(datayear)
	};
	console.log(datasetPop)

	// dataset x as babies y as size [[1, a], [2, b]]
	var datasetSize = []
	for (var i = 0; i < 7; i++) {
		var datayear = [];
		for (var k = 0; k < 21; k++){
			datapoint = [];
			for (var j = 0; j < 30; j++) {
				if (countries[k] == infoBaby[i][j]["country"]) {
					datapoint.push(parseFloat(infoBaby[i][j]["value"].replace(/[^\d\.\-]/g, "")))
					datapoint.push(parseFloat(totalsize[i][k].replace(/[^\d\.\-]/g, "")))
				}
			}
			datayear.push(datapoint)
		}
		datasetSize.push(datayear)
	};
	console.log(datasetSize)
	
	// var slider = document.getElementById("myRange");
	// var output = document.getElementById("demo");
	// output.innerHTML = slider.value; // Display the default slider value

	// Update the current slider value (each time you drag the slider handle)
	// slider.oninput = function() {
	//     output.innerHTML = this.value;
	//     // $("#map").empty()
	//     // makeScatter(error, babiessss[this.value - 2008], )
	// }

	// default map for year 2008
	// makeScatter(error, babiessss[0])

	// makeMap(error)
	// updateMap(error, babiesss[0])
	
	// default is x as babies y as population 2008
	makeScatter(error, datasetPop[0])
	console.log(datasetPop[0])
};
