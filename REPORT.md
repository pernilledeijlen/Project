# author

Pernille Deijlen
10747354

# project: babies in Europe

## description
Het doel van deze pagina is om de verschillen van het aantal geboortes tussen hoofdsteden van Europa te laten zien en welke variabelen hier eventueel invloed op hebben.

## screenshot
![final4](doc/Presentation2.png)

## technical design
Mijn javascript files:
-	**data.js**				laden en verwerken van de data
-	**map.js** 				maken van de kaart
-	**scatter.js** 			maken van de scatterplot
-	**update.js** 			visualisaties updaten met slider en tickboxes 
-	**interactivity.js** 	interactiviteit binnen en tussen visualisaties
-	**bulletchart.js** 		maken van de bulletchart

De data bestaat uit vier CSV files die ik heb omgezet naar JSON files. Deze worden vervolgens via een queue ingeladen in **data.js**. Hier heb ik globale data arrays gemaakt zodat ik hier altijd bij kan komen. Als eerste wordt de data voor de map verwerkt in de functie *dataMap()*. Hier gebruik ik data over het aantal geboortes per jaar per stad. Deze verwerk ik een een dictionary met hierbij de naam van de stad, de value en de fillcolor. Aangezien Londen, Engeland bijna elk jaar een grote outlier was binnen de data, heb ik besloten zelf de schaal voor de fillcolors te bepalen. Op deze manier kan ik wel genoeg verschil tussen de steden/landen laten zien. Hier wordt dan de kaart voor 2008 (default) gemaakt via de functie *makeMap()*. Vervolgens wordt de data voor de scatterplot verwerkt in dataScatter(). Aangezien ik op de y-as twee variabelen heb, heb ik besloten twee data arrays te gebruiken. In beide vind je eerst het aantal geboortes, dan de populatie of grootte, landcode, land en als laatst de stad. Vervolgens wordt de scatterplot voor 2008 en op de y-as populatie gemaakt via *makeScatter()*. Hier na wordt ook *updateSlider()* aangeroepen zodat de kaart en scatterplot updaten. Als laatste in data.js wordt de data voor de bulletchart verwerkt in *dataBulletchart()*. Deze bevat voor elk jaar en stad het aantal geboortes, CO2 uitstoot, GDP, green area, population density en education. Ook is er een data array die alle data per onderwerp voor elk jaar bevat. Zodat hiermee maximum voor alle jaren en steden bepaald kan worden.

In **map.js** staan de functies *makeMap()* waar de kaart gemaakt wordt en de functie *updateMap()* waar deze wordt geupdate. Ik heb een globale variable map zodat beide functies hierbij kunnen. In *makeMap()* wordt gezorgd dat de map is "ingezoomd" op Europa. Ook is er een tooltip gemaakt die het land, de hoofdstad en de exacte waarde weergeeft. Hier worden ook de functies *mouseOverMapScatter()* en *mouseOutMapScatter()* aangeroepen. In de functie *updateMap()* wordt er nieuwe data meegegeven van het jaar van de slider en wordt de map opnieuw ingekleurd met kleuren gebaseerd op de nieuwe values.

In **scatter.js** staan ook twee functies, *makeScatter()* en *updateScatter()*. Bij het maken van de scatterplot wordt eerst de maximum value voor alle jaren bepaald voor de x-as, het aantal geboortes, en de y-as, de populatie. Dit doe ik zodat de waarden van de assen altijd hetzelfde blijven, en je door de jaren heen beter kan vergelijken. Vervolgens kun je met de slider het jaar aanpassen, en met de tickbox een andere y-as kiezen. De scatterplot wordt vervolgens aangepast met *updateScatter()*, deze functie krijgt dan de juiste data mee. Hier wordt ook de maximum bepaalt voor alle jaren voor de grootte, zodat deze as ook altijd hetzelfde blijft. In beide functies worden ook *mouseOverScatter()* en *mouseOutScatter()* aangeroepen wanneer er over een stip gehoverd wordt.

Veranderingen door het aanpassen van de slider of door een andere y-as te kiezen worden verwerkt in **update.js**. Het aanpassen van de slider gaat via *updateSlider()*. Als eerste heb je het default jaar, 2008. Wanneer de y-as hier wordt aangepast, wordt de functie *updateRadio()* aangeroepen. Ook wordt de bulletchart gemaakt wanneer er op de kaart wordt geklikt, *clickMapBullet()*, of wanneer er op een stip wordt geklikt, *clickScatterBullet()*. Wanneer de slider wordt aangepast


## challenges

## defending decisions