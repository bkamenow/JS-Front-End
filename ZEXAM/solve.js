function solve(input) {
	let horses = input.shift().split('|');

	let line = input.shift();

	while (line !== 'Finish'){
		let command = line.split(' ');
		let horseName = command[1];
		let idx = horses.indexOf(horseName);

		switch (command[0]) {

			case 'Retake':
				let overtakenHorse = command[2];
				let secondHorseIdx = horses.indexOf(overtakenHorse)

				if (idx < secondHorseIdx){
					horses[idx] = overtakenHorse
					horses[secondHorseIdx] = horseName
					console.log(`${horseName} retakes ${overtakenHorse}.`);
				}
				break;
			case 'Trouble':
				// Maybe can explode
				if (idx > 0){
					let secondHorseIdx = idx - 1
					horses[idx] = horses[secondHorseIdx]
					horses[secondHorseIdx] = horseName
					console.log(`Trouble for ${horseName} - drops one position.`);
				}
				break;
			case 'Rage':
				horses.splice(idx, 1)
				horses.push(horseName)
				console.log(`${horseName} rages 2 positions ahead.`)
				break;

			case 'Miracle':
				let luckyHorseName = horses[0]
				let luckyHorseIdx = horses.indexOf(luckyHorseName)
				horses.splice(luckyHorseIdx, 1)
				horses.push(luckyHorseName)
				console.log(`What a miracle - ${luckyHorseName} becomes first.`)
				break;
		}
		line = input.shift()
	}


	console.log(horses.join('->'))
	console.log(`The winner is: ${horses.pop()}`)
}

solve((['Onyx|Domino|Sugar|Fiona',
	'Trouble Onyx',
	'Retake Onyx Sugar',
	'Rage Domino',
	'Miracle',
	'Finish'])
)