// TODO:
function attachEvents() {
	const BASE_URL = 'http://localhost:3030/jsonstore/tasks/'
	const buttonTypeTextContent = {
		'ToDo': 'Move to In Progress',
		'In Progress': 'Move to Code Review',
		'Code Review': 'Move to Done',
		'Done': 'Close',
	}

	const inputDOMSelectors = {
		title: document.getElementById('title'),
		description: document.getElementById('description'),
	}

	const sections = {
		todoSection: document.querySelector('#todo-section > ul'),
		inProgressSection: document.querySelector('#in-progress-section > ul'),
		codeReviewSection: document.querySelector('#code-review-section > ul'),
		doneSection: document.querySelector('#done-section > ul'),
	}

	const buttonSection = {
		createTaskBtn: document.getElementById('create-task-btn'),
		loadTaskBtn: document.getElementById('load-board-btn'),
	}

	buttonSection.createTaskBtn.addEventListener('click', createTaskHandler);
	buttonSection.loadTaskBtn.addEventListener('click', loadTaskHandler);

	function loadTaskHandler(event) {
		if(event){
			event.preventDefault()
		}
		sections.todoSection.innerHTML = ''
		sections.inProgressSection.innerHTML = ''
		sections.codeReviewSection.innerHTML = ''
		sections.doneSection.innerHTML = ''

		fetch(BASE_URL)
			.then((res) => res.json())
			.then((data) => {
				for (const id in data) {
					let parentNode;
					switch (data[id].status) {
						case 'ToDo':
							parentNode = sections.todoSection
							break;
						case 'In Progress':
							parentNode = sections.inProgressSection
							break;
						case 'Code Review':
							parentNode = sections.codeReviewSection
							break;
						case 'Done':
							parentNode = sections.doneSection
							break;
					}

					const li = createElement('li', parentNode, '', ['task'], id)
					createElement('h3', li, data[id].title);
					createElement('p', li, data[id].description);
					const button = createElement('button', li, buttonTypeTextContent[data[id].status])
					button.addEventListener('click', moveTaskHandler);
				}
			})
			.catch((error) => console.log(error))
	}
	function createTaskHandler(event){
		if (event){
			event.preventDefault()
		}
		const httpHeaders = {
			method: 'POST',
			body: JSON.stringify({
				'title': inputDOMSelectors.title.value,
				'description': inputDOMSelectors.description.value,
				'status': 'ToDo'
			})
		}
		const allFieldsHaveValue = Object.values(inputDOMSelectors)
			.every((input) => input.value !== '');
		if(!allFieldsHaveValue) {
			console.log('EMPTY FIELD');

		} else {
			fetch(BASE_URL, httpHeaders)
				.then(() => {
					loadTaskHandler(event)
					inputDOMSelectors.title.value = ''
					inputDOMSelectors.description.value = ''
				})
				.catch((error) => console.log(error))
		}
	}

	function moveTaskHandler(event){
		if (event){
			event.preventDefault()
		}
		let id = this.parentNode.id
		let status = this.textContent


		if (status === 'Close'){
			fetch(`${BASE_URL}${id}`, {method: 'DELETE'})
				.then(() => loadTaskHandler())
				.catch((error) => console.log(error))
		}else{
			switch (status) {
				case 'Move to In Progress':
					status = 'In Progress';
					break;
				case 'Move to Code Review':
					status = 'Code Review';
					break;
				case 'Move to Done':
					status = 'Done';
					break;
			}

			const httpHeaders = {
				method: 'PATCH',
				body: JSON.stringify({status: status})
			}
			fetch(`${BASE_URL}${id}`, httpHeaders)
				.then(() => {
					loadTaskHandler(event)
				})
				.catch((error) => console.log(error))
		}
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

attachEvents();