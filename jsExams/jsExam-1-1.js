function solve(input) {
	let num = Number(input.shift());
	let pieceCollection = {};

	for (let i = 0; i < num; i++) {
		let [ piece, composer, key] = input.shift().split('|');
		pieceCollection[piece] = {composer, key};
	}

	for (const line of input) {
		if (line === 'Stop') {
			break;
		}
		let command = line.split('|');

		if (command[0] === 'Add') {
			let [_command, piece, composer, key] = command;
			if (pieceCollection.hasOwnProperty(piece)){
				console.log(`${piece} is already in the collection!`);
			}else {
				pieceCollection[piece] = {composer, key};
				console.log(`${piece} by ${composer} in ${key} added to the collection!`);
			}
		}else if (command[0] === 'Remove') {
			let piece = command[1];
			if ( pieceCollection.hasOwnProperty(piece)) {
				delete pieceCollection[piece];
				console.log(`Successfully removed ${piece}!`);
			}else{
				console.log(`Invalid operation! ${piece} does not exist in the collection.`);
			}
		}else if (command[0] === 'ChangeKey') {
			let [_command, piece, newKey] = command;
			if (pieceCollection.hasOwnProperty(piece)){
				pieceCollection[piece].key = newKey;
				console.log(`Changed the key of ${piece} to ${newKey}!`)
			}else{
				console.log(`Invalid operation! ${piece} does not exist in the collection.`)
			}
		}
	}

	for (const piece in pieceCollection) {
		console.log(`${piece} -> Composer: ${pieceCollection[piece].composer}, Key: ${pieceCollection[piece].key}`)
	}
}

solve([
		'3',
		'Fur Elise|Beethoven|A Minor',
		'Moonlight Sonata|Beethoven|C# Minor',
		'Clair de Lune|Debussy|C# Minor',
		'Add|Sonata No.2|Chopin|B Minor',
		'Add|Hungarian Rhapsody No.2|Liszt|C# Minor',
		'Add|Fur Elise|Beethoven|C# Minor',
		'Remove|Clair de Lune',
		'ChangeKey|Moonlight Sonata|C# Major',
		'Stop'
	]
)