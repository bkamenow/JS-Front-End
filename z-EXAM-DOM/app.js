window.addEventListener('load', solve);

function solve() {
	const icons = {
		'Feature': '&#8865',
		'Low Priority Bug': '&#9737',
		'High Priority Bug': '&#9888;'
	};
	const classes = {
		'Feature': 'feature',
		'Low Priority Bug': 'low-priority',
		'High Priority Bug': 'high-priority'
	};

	let numID = 1;
	let totalPoints = 0;
	const inputID = document.getElementById('task-id');

	const inputDOMSelectors = {
		title: document.getElementById('title'),
		description: document.getElementById('description'),
		label: document.getElementById('label'),
		points: document.getElementById('points'),
		assignee: document.getElementById('assignee')
	};
	const otherDOMSelectors = {
		taskContainer: document.getElementById('tasks-section'),
		createBtn: document.getElementById('create-task-btn'),
		deleteTaskBtn: document.getElementById('delete-task-btn'),
		totalPointsContainer: document.getElementById('total-sprint-points')
	};

	otherDOMSelectors.createBtn.addEventListener('click', createTaskHandler);
	otherDOMSelectors.deleteTaskBtn.addEventListener('click', deleteTaskHandler);

	function createTaskHandler() {
		const allFieldsHaveValue = Object.values(inputDOMSelectors)
			.every((input) => input.value !== '');
		if(!allFieldsHaveValue) {
			console.log('EMPTY FIELD');
			return;
		}

		const { title, description, label, points, assignee } = inputDOMSelectors;
		const inputTasksInfo = {
			title: title.value,
			description: description.value,
			label: label.value,
			estimationPoints: points.value,
			assignee: assignee.value
		};

		const article = createElement('article', otherDOMSelectors.taskContainer, '', ['task-card'], `task-${numID}`);
		const labelDiv = createElement('div', article, '', ['task-card-label', `${classes[label.value]}`]);
		labelDiv.innerHTML = `${label.value} ${icons[label.value]}`;
		createElement('h3', article, title.value, ['task-card-title']);
		createElement('p', article, description.value, ['task-card-description']);
		createElement('div', article, `Estimated at ${points.value} pts`, ['task-card-points']);
		createElement('div', article, `Assigned to: ${assignee.value}`, ['task-card-assignee']);
		const div = createElement('div', article, ``, ['task-card-actions']);
		const deleteBtn = createElement('button', div, 'Delete');
		deleteBtn.addEventListener('click', loadConfirmDeleteHandler);

		totalPoints += Number(points.value);
		otherDOMSelectors.totalPointsContainer.textContent = `Total Points ${totalPoints}pts`;

		for (const key in inputDOMSelectors) {
			inputDOMSelectors[key].value = ''
		}

		numID += 1;
	}

	function loadConfirmDeleteHandler(e) {
		const element = e.currentTarget.parentNode.parentNode;
		const id = element.id;
		const labelElement = element.children[0].classList[1];
		inputDOMSelectors.title.value = element.children[1].textContent;
		inputDOMSelectors.description.value = element.children[2].textContent;
		inputDOMSelectors.points.value = element.children[3].textContent.split(' ')[2];
		inputDOMSelectors.assignee.value = element.children[4].textContent.split('Assigned to: ')[1];
		inputID.value = id;
		if (labelElement === 'feature') {
			inputDOMSelectors.label.value = 'Feature';
		} else if (labelElement === 'low-priority') {
			inputDOMSelectors.label.value = 'Low Priority Bug';
		} else {
			inputDOMSelectors.label.value = 'High Priority Bug';
		}

		pointsToRemove = inputDOMSelectors.points.value;

		otherDOMSelectors.deleteTaskBtn.disabled = false;
		otherDOMSelectors.createBtn.disabled = true;
	}

	function deleteTaskHandler(e) {
		document.getElementById(inputID.value).remove();
		for (const key in inputDOMSelectors) {
			inputDOMSelectors[key].value = ''
			inputDOMSelectors[key].disabled = false
		}
		inputID.value = '';
		inputID.removeAttribute('value');

		totalPoints -= pointsToRemove;
		otherDOMSelectors.createBtn.disabled = false;
		otherDOMSelectors.deleteTaskBtn.disabled = true;

		otherDOMSelectors.totalPointsContainer.textContent = `Total Points ${totalPoints}pts`;
	}

	function createElement(type, parentNode, content, classes, id) {

		const htmlElement = document.createElement(type);

		if(content && type !== 'input') {
			htmlElement.textContent = content;
		}
		if(content && type === 'input') {
			htmlElement.value = content;
		}

		if(id) {
			htmlElement.id = id;
		}

		if(parentNode) {
			parentNode.appendChild(htmlElement);
		}

		if(classes) {
			htmlElement.classList.add(...classes);
		}

		return htmlElement
	}

}





