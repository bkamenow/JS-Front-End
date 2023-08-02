// TODO
function attachEvents() {
	const BASE_URL = 'http://localhost:3030/jsonstore/tasks/';
	const ulContainer = document.getElementById('todo-list');
	const titleInput = document.getElementById('title');
	const addBtn = document.getElementById('add-button');
	const loadBtn = document.getElementById('load-button');
	addBtn.addEventListener('click', addTaskHandler);
	loadBtn.addEventListener('click', loadTaskHandler);

	function addTaskHandler(event) {
		if (event) {
			event.preventDefault()
		}

		const name = titleInput.value;
		const httpHeaders = {
			method: 'POST',
			body: JSON.stringify({name})
		}

		fetch(BASE_URL, httpHeaders)
			.then(() => {
				loadTaskHandler();
				titleInput.value = '';
			})
			.catch((err) => {
				console.error(err);
			})
	}

	function loadTaskHandler(event) {
		if (event){
			event.preventDefault()
		}


		ulContainer.innerHTML = ''
		fetch(BASE_URL)
			.then((data) => data.json())
			.then((taskRes) => {
				const tasks = Object.values(taskRes);
				for (const {_id, name} of tasks) {
					const li = createElement('li', ulContainer, '', _id);
					const span = createElement('span', li, name);
					const removeBtn = createElement('button', li, 'Remove');
					const editBtn = createElement('button', li, 'Edit')

					editBtn.addEventListener('click', loadEditFormHandler);
					removeBtn.addEventListener('click', removeTaskHandler);
				}
			})
			.catch((err) => {
				console.error(err);
			})
	}
	function removeTaskHandler(event) {
		const id = event.currentTarget.parentNode.id;
		const httpHeaders = {
			method: 'DELETE'
		}

		fetch(`${BASE_URL}${id}`, httpHeaders)
			.then(() => loadTaskHandler())
			.catch((err) => {
				console.error(err)
			})
	}
	function loadEditFormHandler(event) {
		const liParent = event.currentTarget.parentNode;
		const [span, _removeBtn, editBtn] = Array.from(liParent.children);
		const editInput = document.createElement('input');
		editInput.value = span.textContent;
		liParent.prepend(editInput);
		const submitBtn = document.createElement('button');
		submitBtn.textContent = 'Submit';
		submitBtn.addEventListener('click', submitTaskHandler);
		liParent.appendChild(submitBtn);
		span.remove();
		editBtn.remove();
	}
	function submitTaskHandler(event) {
		const liParent = event.currentTarget.parentNode;
		const id = liParent.id;
		const [input] = Array.from(liParent.children);
		const httpHeaders = {
			method: 'PATCH',
			body: JSON.stringify({name: input.value})
		}

		fetch(`${BASE_URL}${id}`, httpHeaders)
			.then(() => loadTaskHandler())
			.catch((err) => {
				console.error(err);
			})
	}

}
attachEvents();


function createElement(type, parentNode, content, id, classes) {

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