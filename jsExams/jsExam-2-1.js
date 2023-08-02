function solve(input) {

	let groceries = input.shift().split('!');
	let line = input.shift();

	while (line !== 'Go Shopping!') {
		let [command, item, newItem] = line.split(' ');

		switch (command) {
			case 'Urgent':
				urgent(groceries, item);
				break;
			case 'Unnecessary':
				unnecessery(groceries, item);
				break;
			case 'Correct':
				correct(groceries, item, newItem);
				break;
			case 'Rearrange':
				rearrange(groceries, item);
				break;
			default: break; // needs to include default case for invalid command('Gosho'), otherwise will not break
		}
		line = input.shift();
	}

	console.log(groceries.join(', '));

	function urgent(list, item) {
		if (list.includes(item) == false) {
			list.unshift(item);
		}
	}

	function unnecessery(list, item) {
		if (list.includes(item) == true) {
			let index = list.indexOf(item);
			list.splice(index, 1);
		}
	}

	function correct(list, item, newItem) {
		if (list.includes(item) == true) {
			let index = list.indexOf(item);
			list[index] = newItem;
		}
	}

	function rearrange(list, item) {
		if (list.includes(item) == true) {
			let index = list.indexOf(item);
			// splice and push can not be chained, otherwise will not include removed item at end of list
			list.splice(index, 1);
			list.push(item);
		}
	}
}

solve((["Milk!Pepper!Salt!Water!Banana",
	"Urgent Salt",
	"Unnecessary Grapes",
	"Correct Pepper Onion",
	"Rearrange Grapes",
	"Correct Tomatoes Potatoes",
	"Go Shopping!"])
)
