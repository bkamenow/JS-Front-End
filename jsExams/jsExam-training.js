function solve(input){
	let array = {};
	let line = input.shift();
	while (line !== 'Sail'){
		let [city, pop, g] = line.split('||');
		if (!array.hasOwnProperty(city)) {
			let population = Number(pop);
			let gold = Number(g);
			array[city] = {population, gold};
		}else {
			array[city]['population'] += Number(pop);
			array[city]['gold'] += Number(g);

		}
		line = input.shift();
	}

	line = input.shift();
	while (line !== 'End') {
		let [ command, city, people, gold ] = line.split('=>')

		if ( command === 'Plunder'){
			array[city]['population'] -= Number(people);
			array[city]['gold'] -= Number(gold);
			console.log(`${city} plundered! ${gold} gold stolen, ${people} citizens killed.`);

			if (array[city]['population'] <= 0 || array[city]['gold'] <= 0){
				delete array[city]
				console.log(`${city} has been wiped off the map!`)
			}
		} else if ( command === 'Prosper'){
			let goldForAdd = Number(people)
			if (goldForAdd >= 0){
				array[city]['gold'] += goldForAdd;
				let totalGold = array[city]['gold']
				console.log(`${goldForAdd} gold added to the city treasury. ${city} now has ${totalGold} gold.`)
			} else {
				console.log('Gold added cannot be a negative number!')
			}
		}
		line = input.shift();
	}


	if (Object.keys(array).length > 0) {
		console.log(`Ahoy, Captain! There are ${Object.keys(array).length} wealthy settlements to go to:`)
		for (const city in array) {
			console.log(`${city} -> Population: ${array[city]['population']} citizens, Gold: ${array[city]['gold']} kg`)
		}
	}else {
		console.log("Ahoy, Captain! All targets have been plundered and destroyed!")
	}
}



solve((["Tortuga||345000||1250",
	"Santo Domingo||240000||630",
	"Havana||410000||1100",
	"Sail",
	"Plunder=>Tortuga=>75000=>380",
	"Prosper=>Santo Domingo=>180",
	"End"])
)
