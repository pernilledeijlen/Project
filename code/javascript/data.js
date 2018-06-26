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
var infoBullet;
var uberData = {};

window.onload = function() {


	queue()
		.defer(d3.json, "../data/babies.json")
		.defer(d3.json, "../data/education.json")
		.defer(d3.json, "../data/information.json")
		.defer(d3.json, "../data/popandsize.json")
		.awaitAll(load);
};

function load(error, response) {
	if (error) throw error;

	var babies = response[0];
	var education = response[1];
	var information = response[2];
	var popandsize = response[3];

	// dataset for map
	dataMap(error, babies);

	// dataset for scatterplot
	dataScatter(error, babies, popandsize);

	// dataset for bulletchart
	dataBulletchart(error, babies, education, information);
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
			year.push(data[j]);
		};
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
			};
		});
		mapData.push(timTest);
		uberData[2008 + i] = uberTest;
	};

	// make default map for year 2008
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
			size.push(popSize[j]["value"]);
		};
		begin1 += 1;
		totalSize.push(size);
	};

	var population = [];
	var begin2 = 148;

	// population array for each year
	for (var i = 0; i < 7; i++) {
		var pop = [];
		for (var j = begin2; j < popSize.length; j += 7) {
			pop.push(popSize[j]["value"]);
		};
		begin2 += 1;
		population.push(pop);
	};

	// countrycode/country/capital array for above datasets
	var infoCountry = [];
	for (var i = 1; i < popSize.length; i += 7) {
		var info = [];
		info.push(popSize[i]["countrycode"]);
		info.push(popSize[i]["country"]);
		info.push(popSize[i]["city"]);
		infoCountry.push(info);
	};

	var infoBaby = [];
	var begin = 2;

	// amount of babies born array for each year
	for (var i = 0; i < 7; i++) {
		var baby = [];
		for (var j = begin; j < babiesBorn.length; j += 10) {
			baby.push(babiesBorn[j]);
		};
		begin += 1;
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
					datapoint.push(parseFloat(infoBaby[i][j]["value"].replace(/[^\d\.\-]/g, "")));
					datapoint.push(parseFloat(population[i][k].replace(/[^\d\.\-]/g, "")));
					datapoint.push(infoCountry[k][0]);
					datapoint.push(infoCountry[k][1]);
					datapoint.push(infoCountry[k][2]);
				};
			};
			datayear.push(datapoint)
		};
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
					datapoint.push(parseFloat(infoBaby[i][j]["value"].replace(/[^\d\.\-]/g, "")));
					datapoint.push(parseFloat(totalSize[i][k].replace(/[^\d\.\-]/g, "")));
					datapoint.push(infoCountry[k][0]);
					datapoint.push(infoCountry[k][1]);
					datapoint.push(infoCountry[k][2]);
				};
			};
			datayear.push(datapoint)
		};
		datasetSize.push(datayear)
	};

	// default babies vs population 2008 misschien hoeft dit niet? meteen updateslider pakken met current year
	makeScatter(error, datasetPop[0]);

	// updating scatter map and bullet
	updateSlider(error);
};

// data for bulletchart in right format
function dataBulletchart(error, data1, data2, data3) {
	if (error) throw error;
	
	var births = data1;
	var educ = data2;
	var info = data3;

	var infoBaby = [];
	var begin = 2;

	// amount of babies born array for each year
	for (var i = 0; i < 7; i++) {
		var baby = [];
		for (var j = begin; j < 301; j += 10) {
			baby.push(births[j]);
		};
		begin += 1;
		infoBaby.push(baby);
	};

	var educationCountry = [];
	var begin1 = 1;

	// education array for each year
	for (var i = 0; i < 7; i++) {
		var educCountry = [];
		for (var j = begin1; j < educ.length; j += 10) {
			educCountry.push(educ[j]);
		};
		begin1 += 1;
		educationCountry.push(educCountry);
	};

	var informationCountry = [];
	var begin2 = 1;

	// other information array for each year with array for each subject
	for (var i = 0; i < 7; i++) {
		var infoCountry = [];
		for (var k = 0; k < 4; k++) {
			var subject = [];
			for (var j = begin2; j < info.length; j += 28) {
				subject.push(info[j]);
			};
			begin2 += 1;
			infoCountry.push(subject);
		};
		informationCountry.push(infoCountry);
	};

	// all data together for bulletchart
	bulletData = [];
	for (var i = 0; i < informationCountry.length; i++) {
		var datayear = [];
		for (var k = 0; k < informationCountry[i][0].length; k++) {
			var datapoint = [];
			for (var l = 0; l < infoBaby[i].length; l++) {
				if (informationCountry[i][0][k]["country"] == infoBaby[i][l]["country"]) {
					if (infoBaby[i][l]["value"] != "-") {
						datapoint.push(parseFloat(infoBaby[i][l]["value"].replace(/[^\d\.\-]/g, "")));
					}
					else {
						datapoint.push(0)
					};
					for (var j = 0; j < 4; j++) {
						if (informationCountry[i][j][k]["value"] != "-") {
							datapoint.push(parseFloat(informationCountry[i][j][k]["value"].replace(/[^\d\.\-]/g, "")))
						}
						else {
							datapoint.push(0);
						};
					};
					if (educationCountry[i][l]["value"] != "-") {
						datapoint.push(parseFloat(educationCountry[i][l]["value"].replace(/[^\d\.\-]/g, "")))
					}
					else {
						datapoint.push(0);
					};
					if (infoBaby[i][l]["country"] == "The Netherlands") {
						datapoint.push("Netherlands");
					}
					else {
						datapoint.push(infoBaby[i][l]["country"]);
					};
					datapoint.push(infoBaby[i][l]["city"]);
				};
			};
			datayear.push(datapoint);
		};
		bulletData.push(datayear);
	};

	// arrays for each year with the data so the minimum, maximum and average can be calculated
	// array with baby data for each year
	var babies1 = [];
	// array with all baby data
	var babies2 = [];
	for (var i = 0; i < infoBaby.length; i++) {
		var year = [];
		for (var j = 0; j < infoBaby[i].length; j++) {
			if (infoBaby[i][j]["value"] != "-") {
				year.push(parseInt(infoBaby[i][j]["value"]));
				babies2.push(parseInt(infoBaby[i][j]["value"]));
			};
		};
		babies1.push(year)
	};

	// array with CO2 data for each year
	var CO21 = [];
	// array with all CO2 data
	var CO22 = [];
	for (var i = 0; i < bulletData.length; i++) {
		var year = [];
		for (var j = 0; j < bulletData[i].length; j++) {
			if (bulletData[i][j][1] != 0) {
				year.push(bulletData[i][j][1]);
				CO22.push(bulletData[i][j][1]);	
			};
		};
		CO21.push(year)
	};

	// array with GDP data for each year
	var GDP1 = [];
	// array with all GDP data
	var GDP2 = [];
	for (var i = 0; i < bulletData.length; i++) {
		var year = [];
		for (var j = 0; j < bulletData[i].length; j++) {
			if (bulletData[i][j][2] != 0) {
				year.push(bulletData[i][j][2]);
				GDP2.push(bulletData[i][j][2]);	
			};
		};
		GDP1.push(year)
	};

	// array with green area data for each year
	var green1 = [];
	// array with all green area data
	var green2 = [];
	for (var i = 0; i < bulletData.length; i++) {
		var year = [];
		for (var j = 0; j < bulletData[i].length; j++) {
			if (bulletData[i][j][3] != 0) {
				year.push(bulletData[i][j][3]);	
				green2.push(bulletData[i][j][3]);
			};
		};
		green1.push(year)
	};

	// array with all population density data
	var popDens1 = [];
	// array with population density data for each year
	var popDens2 = [];
	for (var i = 0; i < bulletData.length; i++) {
		var year = [];
		for (var j = 0; j < bulletData[i].length; j++) {
			if (bulletData[i][j][4] != 0) {
				year.push(bulletData[i][j][4]);
				popDens2.push(bulletData[i][j][4]);
			};
		};
		popDens1.push(year)
	};

	// array with education data for each year
	var education1 = [];
	// array with all education data
	var education2 = [];
	for (var i = 0; i < bulletData.length; i++) {
		var year = [];
		for (var j = 0; j < bulletData[i].length; j++) {
			if (bulletData[i][j][5] != 0) {
				year.push(bulletData[i][j][5]);
				education2.push(bulletData[i][j][5]);
			};
		};
		education1.push(year)
	};

	// all data in one big array
	var allData = [];
	allData.push(babies2)
	allData.push(CO22)
	allData.push(GDP2)
	allData.push(green2)
	allData.push(popDens2)
	allData.push(education2)

	// put everything in one global data array
	infoBullet = [];
	infoBullet.push(babies1)
	infoBullet.push(CO21)
	infoBullet.push(GDP1)
	infoBullet.push(green1)
	infoBullet.push(popDens1)
	infoBullet.push(education1)
	infoBullet.push(allData)
};

// function dataBarchart() {
// 	lange array van alle data
//	pak van infoBullet[0]

// };
