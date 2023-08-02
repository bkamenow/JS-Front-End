function solve(input) {
	let number = Number(input.shift());

	let pieceList = {};

	for (let i = 0; i < number; i++) {
		const [piece, composer, key] = input.shift().split('|');
		pieceList[piece] = {composer, key};
	}

	for (const line of input) {

		if (line === 'Stop') {
			break;
		}

		let data = line.split('|');
		let command = data[0];
		let piece = data[1];

		switch (command) {
			case 'Add':
				let composer = data[2];
				let key = data[3];
				if (pieceList.hasOwnProperty(piece)){
					console.log(`${piece} is already in the collection!`);
				}else {
					pieceList[piece] = {composer, key};
					console.log(`${piece} by ${composer} in ${key} added to the collection!`)
				}
				break;
			case 'Remove':
				if (pieceList.hasOwnProperty(piece)){
					delete pieceList[piece]
					console.log(`Successfully removed ${piece}!`);
				}else {
					console.log(`Invalid operation! ${piece} does not exist in the collection.`);
				}
				break;
			case 'ChangeKey':
				let newKey = data[2];
				if (pieceList.hasOwnProperty(piece)){
					pieceList[piece].key = newKey;
					console.log(`Changed the key of ${piece} to ${newKey}!`);
				}else {
					console.log(`Invalid operation! ${piece} does not exist in the collection.`);
				}
				break;
		}

	}


	for (const piece in pieceList) {
		console.log(`${piece} -> Composer: ${pieceList[piece]['composer']}, Key: ${pieceList[piece]['key']}`)
	}
}

solve([
		'4',
		'Eine kleine Nachtmusik|Mozart|G Major',
		'La Campanella|Liszt|G# Minor',
		'The Marriage of Figaro|Mozart|G Major',
		'Hungarian Dance No.5|Brahms|G Minor',
		'Add|Spring|Vivaldi|E Major',
		'Remove|The Marriage of Figaro',
		'Remove|Turkish March',
		'ChangeKey|Spring|C Major',
		'Add|Nocturne|Chopin|C# Minor',
		'Stop'
	]

)