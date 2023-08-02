function solve(input) {
	let number = Number(input.shift());

	let springBoard = {};
	let tasks = {};
	let taskPoints = {
		'ToDo': 0,
		'In Progress': 0,
		'Code Review': 0,
		'Done Points': 0,
	}

	for (let i = 0; i < number; i++) {
		let data = input.shift();
		let [assignee, taskId, title, status, points] = data.split(':');

		if (springBoard.hasOwnProperty(assignee)) {
			springBoard[assignee].push(taskId);
		} else {
			springBoard[assignee] = [taskId];
		}
		tasks[taskId] = {title, status, points};
	}


	while (input.length > 0) {
		let [command, assignee, taskId, title, status, points] = input.shift().split(':');

		if (!springBoard.hasOwnProperty(assignee)) {
			console.log(`Assignee ${assignee} does not exist on the board!`);
		} else {
			switch (command) {
				case 'Add New':
					springBoard[assignee].push(taskId);
					tasks[taskId] = {title, status, points};
				break;
				case 'Change Status':
					if (!tasks.hasOwnProperty(taskId)) {
						console.log(`Task with ID ${taskId} does not exist for ${assignee}!`);
					} else {
						tasks[taskId]['status'] = title;
					}
					break;
				case 'Remove Task':
					let index = Number(taskId);
					if (index < 0 || springBoard[assignee].length <= index) {
						console.log('Index is out of range!');
					} else {
						let id = springBoard[assignee][index];
						springBoard[assignee].splice(index, 1);
						delete tasks[id];
					}
					break;
				}
	        }
	}

	for (const tasksKey in tasks) {
		let current_status = tasks[tasksKey]['status']
		let pts = Number(tasks[tasksKey]['points'])
		switch (current_status) {
			case 'ToDo':
				taskPoints['ToDo'] += pts;
				break;
			case 'In Progress':
				taskPoints['In Progress'] += pts;
				break;
			case 'Code Review':
				taskPoints['Code Review'] += pts;
				break;
			case 'Done':
				taskPoints['Done Points'] += pts;
				break;
		}
	}
	let sum = taskPoints['ToDo'] + taskPoints["Code Review"] + taskPoints["In Progress"]

	for (const pts in taskPoints) {
		console.log(`${pts}: ${taskPoints[pts]}pts`)
	}

	if (taskPoints['Done Points'] >= sum){
		console.log('Sprint was successful!');
	}else {
		console.log('Sprint was unsuccessful...');
	}

}


solve(  [
		'4',
		'Kiril:BOP-1213:Fix Typo:Done:1',
		'Peter:BOP-1214:New Products Page:In Progress:2',
		'Mariya:BOP-1215:Setup Routing:ToDo:8',
		'Georgi:BOP-1216:Add Business Card:Code Review:3',
		'Add New:Sam:BOP-1237:Testing Home Page:Done:3',
		'Change Status:Georgi:BOP-1216:Done',
		'Change Status:Will:BOP-1212:In Progress',
		'Remove Task:Georgi:3',
		'Change Status:Mariya:BOP-1215:Done',
	])