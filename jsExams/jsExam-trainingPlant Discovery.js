function plantDiscovery (input){
	let plantsCount = input.shift();
	let plants = {};
	for (let i = 0; i<plantsCount;i++){
		let plantData = input.shift().split("<->");
		plants[plantData[0]] = {
			rarity: Number(plantData[1]),
			rating: [],
		}
	}
	let command = input.shift();
	while (command !== "Exhibition"){
		let commandLines = command.split(": ");
		let actionData = commandLines[1].split(' - ');
		let plantName = actionData[0];

		if(plants.hasOwnProperty(plantName)){
			switch (commandLines[0]) {
				case "Rate":
					plants[plantName].rating.push(Number(actionData[1]));
					break;
				case "Update":
					plants[plantName].rarity = Number(actionData[1])
					break;
				case "Reset":
					plants[plantName].rating = [];
					break;
			}
		}else{
			console.log("error");
		}
		command = input.shift();
	}
	console.log("Plants for the exhibition:");

	for (const plant in plants) {
		let ratingSum = 0
		let ratingsNumber = plants[plant].rating.length;
		for (const rate of plants[plant].rating) {
			ratingSum += rate;
		}
		let avgPlantRating = ratingSum / ratingsNumber;
		if(!avgPlantRating){
			avgPlantRating = 0;
		}
		console.log(`- ${plant}; Rarity: ${plants[plant].rarity}; Rating: ${avgPlantRating.toFixed(2)}`);
	}
}