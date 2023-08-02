function attachEvents() {
	const BASE_URL = 'http://localhost:3030/jsonstore/tasks/';
	const textInput = document.getElementById('title');
	const list = document.getElementById('todo-list')
	const addBtn = document.getElementById('add-button');
	const loadBtn = document.getElementById('load-button');
	loadBtn.addEventListener('click', loadBtnHandler)
	addBtn.addEventListener('click', addBtnHandler)

	function addBtnHandler(event) {
		if (event) {
			event.preventDefault()
		}

		const name = textInput.value;
		const httpHeaders = {
			method: 'POST',
			body: JSON.stringify({name})
		}

		fetch(BASE_URL, httpHeaders)
			.then(() => {
				loadBtnHandler();
				textInput.value = '';
			})
			.catch((err) => {
				console.error(err);
			})

	}
	function loadBtnHandler(event) {
		if (event) {
			event.preventDefault()
		}

		list.innerHTML = ''

		fetch(BASE_URL)
			.then((res) => res.json())
			.then((data) => {
				for (const id in data) {
					if (data[id]['name']){
						const li = createElement('li', list);
						createElement('span', li, `${data[id]['name']}`);
						const removeBtn = createElement('button', li, 'Remove');
						const editBtn = createElement('button', li, 'Edit');
						removeBtn.addEventListener('click', removeBtnHandler)
						editBtn.addEventListener('click', loadBtnHandler)
					}
				}
			})
			.catch((error) => {
				console.log(error)
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

	function removeBtnHandler(event){
		const id = event.currentTarget.parentNode.id;
		const httpHeaders = {
			method: 'DELETE'
		}

		fetch(`${BASE_URL}${id}`, httpHeaders)
			.then(() => loadBtnHandler())
			.catch((err) => {
				console.error(err)
			})

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
			.then(() => loadBtnHandler())
			.catch((err) => {
				console.error(err);
			})
	}
}

attachEvents();


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
