/*
* Pernille Deijlen
* 10747354
* In this file you will find the functions for loading the data for each visualisation.
*/

// gobal data arrays
var mapData;
var datasetPop;
var datasetSize;
var bulletData;
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
	};

	// default map for year 2008
	makeMap(error, mapData);

};

// data for scatterplot in right format
function dataScatter(error, data1, data2) {
	if (error) throw error;

	var babiesBorn = data1;
	var popSize = data2;
	var totalSize = [];
	var begin1 = 1;

	// size array for each year
	for (var i = 0; i < 7; i++) {
		var size = [];
		for (var j = begin1; j < 148; j += 7) {
			size.push(popSize[j]["value"])
		}
		begin1 += 1
		totalSize.push(size)
	};

	var population = [];
	var begin2 = 148;

	// population array for each year
	for (var i = 0; i < 7; i++) {
		var pop = [];
		for (var j = begin2; j < popSize.length; j += 7) {
			pop.push(popSize[j]["value"])
		}
		begin2 += 1
		population.push(pop)
	};

	// countrycode/country/capital array for above datasets
	var infoCountry = [];
	for (var i = 1; i < popSize.length; i += 7) {
		var info = []
		info.push(popSize[i]["countrycode"])
		info.push(popSize[i]["country"])
		info.push(popSize[i]["city"])
		infoCountry.push(info)
	};

	var infoBaby = [];
	var begin = 2;

	// amount of babies born array for each year
	for (var i = 0; i < 7; i++) {
		var baby = [];
		for (var j = begin; j < babiesBorn.length; j += 10) {
			baby.push(babiesBorn[j])
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
					datapoint.push(parseFloat(totalSize[i][k].replace(/[^\d\.\-]/g, "")))
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
function dataBulletchart(error, data1, data2, data3) {
// 	// global array maken voor deze data
	
	var births = data1;
	var educ = data2;
	var info = data3;

	var infoBaby = [];
	var begin = 2;

	// amount of babies born array for each year
	for (var i = 0; i < 7; i++) {
		var baby = [];
		for (var j = begin; j < 301; j += 10) {
			baby.push(births[j])
		}
		begin += 1
		infoBaby.push(baby);
	};

	var educationCountry = [];
	var begin1 = 1;

	// education array for each year
	for (var i = 0; i < 7; i++) {
		var educCountry = [];
		for (var j = begin1; j < educ.length; j += 10) {
			educCountry.push(educ[j])
		}
		begin1 += 1
		educationCountry.push(educCountry)
	};

	var informationCountry = [];
	var begin2 = 1;

	// other information array for each year with array for each subject
	for (var i = 0; i < 7; i++) {
		var infoCountry = [];
		for (var k = 0; k < 4; k++) {
			var subject = [];
			for (var j = begin2; j < info.length; j += 28) {
				subject.push(info[j])
			}
			begin2 += 1
			infoCountry.push(subject)
		}
		informationCountry.push(infoCountry)
	};

	// all data together for bulletchart
	bulletData = [];
	for (var i = 0; i < 7; i++) {
		var datayear = [];
		for (var k = 0; k < informationCountry[i][0].length; k++) {
			var datapoint = [];
			for (var l = 0; l < infoBaby[i].length; l++) {
				if (informationCountry[i][0][k]["country"] == infoBaby[i][l]["country"]) {
					datapoint.push(parseFloat(infoBaby[i][l]["value"].replace(/[^\d\.\-]/g, "")))
					for (var j = 0; j < 4; j++) {
						datapoint.push(parseFloat(informationCountry[i][j][k]["value"].replace(/[^\d\.\-]/g, "")))
					}
					datapoint.push(parseFloat(educationCountry[i][l]["value"].replace(/[^\d\.\-]/g, "")))
					datapoint.push(infoBaby[i][l]["country"])
					datapoint.push(infoBaby[i][l]["city"])

				};
			};
			datayear.push(datapoint);
		};
		bulletData.push(datayear);
	};

	// voorbeeld voor make bulletchart jaar 2008 en nederland
	for (var i = 0; i < bulletData[0].length; i++) {
		if (bulletData[0][i][6] == "The Netherlands") {
			dataMakeBulletchart(error, bulletData[0][i])
		}
	}
};