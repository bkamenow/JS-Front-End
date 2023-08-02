function attachEvents() {
	const BASE_URL = 'http://localhost:3030/jsonstore/tasks/';
	let id;
	const inputDOMSelectors = {
		title: document.getElementById('course-name'),
		type: document.getElementById('course-type'),
		description: document.getElementById('description'),
		teacher: document.getElementById('teacher-name')
	}

	const otherDOMSelectors = {
		addBtn: document.getElementById('add-course'),
		editCourseBtn: document.getElementById('edit-course'),
		loadBtn: document.getElementById('load-course'),
		courseContainer: document.getElementById('list')
	}
	otherDOMSelectors.loadBtn.addEventListener('click', loadCourseHandler);
	otherDOMSelectors.addBtn.addEventListener('click', addCourseHandler);
	otherDOMSelectors.editCourseBtn.addEventListener('click', editCourseFormHandler);

	function editCourseHandler(event) {
		if (event){
			event.preventDefault();
		}
		id = this.parentNode.id;
		const parent = Array.from(this.parentNode.childNodes);
		let title = parent[0].textContent;
		let type = parent[2].textContent;
		let description = parent[3].textContent;
		let teacher = parent[1].textContent;

		inputDOMSelectors.title.value = title;
		inputDOMSelectors.type.value = type;
		inputDOMSelectors.description.value = description;
		inputDOMSelectors.teacher.value = teacher;
		this.parentNode.remove();

		otherDOMSelectors.addBtn.disabled = true;
		otherDOMSelectors.editCourseBtn.disabled = false;
	}

	function finishCourseHandler(event) {
		if (event){
			event.preventDefault();
		}
		id = this.parentNode.id

		fetch(`${BASE_URL}${id}`, {method: 'DELETE'})
			.then(() => loadCourseHandler(event))
			.catch((error) => console.log(error))
	}
	function editCourseFormHandler(event) {
		if (event){
			event.preventDefault();
		}
		const allFieldsHaveValue = Object.values(inputDOMSelectors)
			.every((input) => input.value !== '');
		if(!allFieldsHaveValue) {
			console.log('EMPTY FIELD');
		}else {
			const httpHeaders = {
				method: 'PUT',
				body: JSON.stringify({
					'title': inputDOMSelectors.title.value,
					'type': inputDOMSelectors.type.value,
					'description': inputDOMSelectors.description.value,
					'teacher': inputDOMSelectors.teacher.value
				})
			}
			fetch(BASE_URL + id, httpHeaders)
				.then(() => {
					loadCourseHandler(event)
					otherDOMSelectors.addBtn.disabled = false;
					otherDOMSelectors.editCourseBtn.disabled = true;
					Object.values(inputDOMSelectors)
						.forEach((input) => {
							input.value = '';
						})

				})
				.catch((error) => console.log(error))
		}

	}
	function loadCourseHandler(event) {
		if (event){
			event.preventDefault()
		}
		otherDOMSelectors.courseContainer.innerHTML = ''

		fetch(BASE_URL)
			.then((res) => res.json())
			.then((data) => {
				for (const id in data) {
					const div = createElement('div', otherDOMSelectors.courseContainer, '', ['container'], id);
					createElement('h2', div, data[id].title);
					createElement('h3', div, data[id].teacher);
					createElement('h3', div, data[id].type);
					createElement('h4', div, data[id].description);
					const editBtn = createElement('button', div, 'Edit Course', ['edit-btn']);
					const finishBtn = createElement('button', div, 'Finish Course', ['finish-btn']);
					finishBtn.addEventListener('click', finishCourseHandler)
					editBtn.addEventListener('click', editCourseHandler);
				}
			})
			.catch((errors) => console.log(errors))
	}
	function addCourseHandler(event){
		if (event){
			event.preventDefault()
		}
		const allFieldsHaveValue = Object.values(inputDOMSelectors)
			.every((input) => input.value !== '');
		if(!allFieldsHaveValue) {
			console.log('EMPTY FIELD');
		}else {
			let courseType = inputDOMSelectors.type.value
			if (courseType === 'Long' || courseType === 'Medium' || courseType === 'Short'){
				const httpHeaders = {
					method: 'POST',
					body: JSON.stringify({
						'title': inputDOMSelectors.title.value,
						'type': inputDOMSelectors.type.value,
						'description': inputDOMSelectors.description.value,
						'teacher': inputDOMSelectors.teacher.value
					})
				}
				fetch(BASE_URL, httpHeaders)
					.then(() => {
						loadCourseHandler(event)
						Object.values(inputDOMSelectors)
							.forEach((input) => {
								input.value = '';
							})
					})
					.catch((error) => console.log(error))
			}else {
				console.log('Wrong Type')
			}

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

attachEvents()