/*
* Pernille Deijlen
* 10747354
* In this file you will find the functions for loading the data for each visualisation.
*/

// gobal data arrays
var mapData;
var datasetPop;
var datasetSize;
var data2008;
var uberData = {};

window.onload = function() {


	queue()
		.defer(d3.json, "babies.json")
		.defer(d3.json, "education.json")
		.defer(d3.json, "information.json")
		.defer(d3.json, "popandsize.json")
		.awaitAll(load);
};

function load(error, response) {
	if (error) throw error;

	var babies = response[0];
	var education = response[1];
	var information = response[2];
	var popandsize = response[3];

	// dataset for map
	dataMap(error, babies)

	// dataset for scatterplot
	dataScatter(error, babies, popandsize)

	// dataset for bulletchart
	dataBulletchart(error, babies, education, information)
};

// data for map in right format
function dataMap(error, dataForMap) {
	if (error) throw error;

	var infoBaby = [];
	var begin = 2;
	
	// data array for each year for map
	for (var i = 0; i < 7; i++) {
		var year = [];
		for (var j = begin; j < 301; j += 10) {
			year.push(dataForMap[j])
		}
		begin += 1;
		infoBaby.push(year);
	};

	// made my own logical color scale
	var paletteScale = d3.scale.threshold()
		.domain([10000, 20000, 30000, 40000])
		.range(["#d4b9da", "#c994c7", "#df65b0", "#dd1c77", "980043"]);
	
	// array for map data
	mapData = [];
	
	for (var i = 0; i < 7; i++) {
		let timTest = {};
		let uberTest = {};
		infoBaby[i].forEach(function(item){
			var countrycode = item["countrycode"];
			var value = item["value"];
			var city = item["city"];
			uberTest[countrycode] = {city: city, value: value, fillColor: value == "-" ? "lightgrey" : paletteScale(value)};
			if (value == "-") {
				timTest[countrycode] = {city: city, value: value, fillColor: "lightgrey"};
			}
			else {
				timTest[countrycode] = {city: city, value: value, fillColor: paletteScale(value)};
			}
		});
		mapData.push(timTest);
		uberData[2008 + i] = uberTest;
		console.log(mapData);
		
	};
	console.log(mapData)
	// default map for year 2008
	makeMap(error, mapData);

};

// data for scatterplot in right format
function dataScatter(error, data1, data2) {
	console.log(mapData);
	if (error) throw error;

	var tim = data1;
	var popandsize = data2;
	var totalsize = [];
	var begin1 = 1;

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

	// countrycode/country/capital array for above datasets
	var infoCountry = [];
	for (var i = 1; i < 295; i +=7) {
		var info = []
		info.push(popandsize[i]["countrycode"])
		info.push(popandsize[i]["country"])
		info.push(popandsize[i]["city"])
		infoCountry.push(info)
	};

	var infoBaby = [];
	var begin = 2;

	// amount of babies born array for each year
	for (var i = 0; i < 7; i++) {
		var baby = [];
		for (var j = begin; j < 301; j += 10) {
			baby.push(tim[j])
		}
		begin += 1
		infoBaby.push(baby);
	};

	// dataset for population cities
	datasetPop = []
	for (var i = 0; i < 7; i++) {
		var datayear = [];
		for (var k = 0; k < 21; k++){
			datapoint = [];
			for (var j = 0; j < 30; j++) {
				if (infoCountry[k][1] == infoBaby[i][j]["country"]) {
					datapoint.push(parseFloat(infoBaby[i][j]["value"].replace(/[^\d\.\-]/g, "")))
					datapoint.push(parseFloat(population[i][k].replace(/[^\d\.\-]/g, "")))
					datapoint.push(infoCountry[k][0])
					datapoint.push(infoCountry[k][1])
					datapoint.push(infoCountry[k][2])
				}
			}
			datayear.push(datapoint)
		}
		datasetPop.push(datayear)
	};

	// dataset for size cities
	datasetSize = []
	for (var i = 0; i < 7; i++) {
		var datayear = [];
		for (var k = 0; k < 21; k++){
			datapoint = [];
			for (var j = 0; j < 30; j++) {
				if (infoCountry[k][1] == infoBaby[i][j]["country"]) {
					datapoint.push(parseFloat(infoBaby[i][j]["value"].replace(/[^\d\.\-]/g, "")))
					datapoint.push(parseFloat(totalsize[i][k].replace(/[^\d\.\-]/g, "")))
					datapoint.push(infoCountry[k][0])
					datapoint.push(infoCountry[k][1])
					datapoint.push(infoCountry[k][2])
				}
			}
			datayear.push(datapoint)
		}
		datasetSize.push(datayear)
	};

	// default babies vs population 2008 misschien hoeft dit niet? meteen updateslider pakken met current year
	makeScatter(error)

	console.log(mapData);
	// updating scatter and map
	updateSlider(error, mapData)
};

// // data for bulletchart in right format
// function dataBulletchart(error, data1, data2, data3) {
// 	// global array maken voor deze data


// };