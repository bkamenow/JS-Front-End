window.addEventListener("load", solve);

function solve() {
	const inputDOMSelectors = {
		title: document.getElementById('task-title'),
		category: document.getElementById('task-category'),
		content: document.getElementById('task-content'),
	}

	const otherDOMSelectors = {
		publishBtn: document.getElementById('publish-btn'),
		reviewList: document.getElementById('review-list'),
		publishList: document.getElementById('published-list')
	}
	otherDOMSelectors.publishBtn.addEventListener('click', publishTaskHandler);


	const refInputFields = {
		title: null,
		category: null,
		content: null,
	}
	function publishTaskHandler() {
		const allFieldsHaveValue = Object.values(inputDOMSelectors)
			.every((input) => input.value !== '');
		if(!allFieldsHaveValue) {
			console.log('EMPTY FIELD');
			return;
		}

		const {title, category, content} = inputDOMSelectors;
		const li = createElement('li', otherDOMSelectors.reviewList, '', ['rpost']);
		const article = createElement('article', li);
		createElement('h4', article, title.value);
		createElement('p', article, `Category: ${category.value}`);
		createElement('p', article, `Content: ${content.value}`);
		const editBtn = createElement('button', li, 'Edit', ['action-btn', 'edit']);
		const postBtn = createElement('button', li, 'Post', ['action-btn', 'post']);

		editBtn.addEventListener('click', editTaskHandler);
		postBtn.addEventListener('click', postTaskHandler);

		for (const key in inputDOMSelectors) {
			refInputFields[key] = inputDOMSelectors[key].value;
		}

		clearAllInputs()
	}

	function postTaskHandler() {
		let child = this.parentNode
		child.removeChild(child.lastChild)
		child.removeChild(child.lastChild)
		otherDOMSelectors.publishList.appendChild(child)
	}
	function editTaskHandler() {
		const parent = Array.from(this.parentNode.firstChild.childNodes);
		let title = parent[0].textContent;
		let category = parent[1].textContent.split(': ')[1];
		let content = parent[2].textContent.split(': ')[1];

		inputDOMSelectors.title.value = title;
		inputDOMSelectors.category.value = category;
		inputDOMSelectors.content.value = content;

		this.parentNode.remove()

	}

	function clearAllInputs() {
		Object.values(inputDOMSelectors)
			.forEach((input) => {
				input.value = '';
			})
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
