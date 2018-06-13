/*
* Pernille Deijlen
* 10747354
*/

window.onload = function() {

	queue()
		.defer(d3.json, "scripts/babies.json")
		.defer(d3.json, "scripts/education.json")
		.defer(d3.json, "scripts/information.json")
		.awaitAll(load);
};

function load(error, data) {
	if (error) throw error;

	var babies = data[0];;
	var education = data[1];
	var information = data[2];

	console.log(babies);
	console.log(education);
	console.log(information);

	// min and max values amount of babies born
	var minValue = 1089; // math.min()
	var maxValue = 198719; //math.max()

	// create color palette
	var paletteScale = d3.scale.linear()
		.domain([minValue, maxValue])
		.range(["#EFEFFF", "#02386F"]);

	var infoBaby = [];
	var begin = 2;
	
	// data array for each year for map
	for (var i = 0; i < 7; i++) {
		var year = [];
		for (var j = begin; j < 301; j += 10) {
			year.push(babies[j])
		}
		begin += 1
		infoBaby.push(year);
	}
	console.log(infoBaby)

	var babiessss = [];
	
	for (var i = 0; i < 7; i++) {
		var babiesss = {};
		infoBaby[i].forEach(function(item){
			var countrycode = item["countrycode"]
			var value = item["value"]
			var city = item["city"]
			// if (value == "-") {
			babiesss[countrycode] = {city: city, value: value, fillColor: paletteScale(value)}
		})
		babiessss.push(babiesss)
	}

	// array voor 2008
	console.log(babiessss[0])
	// array voor 2014
	console.log(babiessss[6])


	var slider = document.getElementById("myRange");
	var output = document.getElementById("demo");
	output.innerHTML = slider.value; // Display the default slider value

	// Update the current slider value (each time you drag the slider handle)
	slider.oninput = function() {
	    output.innerHTML = this.value;
	    // makeMap(error, babiessss[this.value - 2008])
	}

	makeMap(error, babiessss[slider.value - 2008])
	makeScatter(error)

};