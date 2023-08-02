window.addEventListener("load", solve);

function solve() {
	  const inputDOMSelectors = {
		  firstName: document.getElementById('first-name'),
		  lastName: document.getElementById('last-name'),
		  age: document.getElementById('age'),
		  title: document.getElementById('story-title'),
		  genre: document.getElementById('genre'),
		  story: document.getElementById('story'),
	  };

	  const otherDOMSelectors = {
		  publishBtn: document.getElementById('form-btn'),
		  previewList: document.getElementById('preview-list'),
	  };

	  otherDOMSelectors.publishBtn.addEventListener('click', publishBtnHandler);


	  const savedInputFields = {
		  firstName: null,
		  lastName: null,
		  age: null,
		  title: null,
		  genre: null,
		  story: null,
	  }
	  function publishBtnHandler() {
		  const allFieldsHaveValue = Object.values(inputDOMSelectors)
			  .every((input) => input.value !== '');
		  if(!allFieldsHaveValue) {
			  console.log('EMPTY FIELD');
			  return;
		  }

		  for (const key in inputDOMSelectors) {
			  savedInputFields[key] = inputDOMSelectors[key].value
		  }

		  const { firstName, lastName, age, title, genre, story} = inputDOMSelectors;

		  const li = createElement('li', otherDOMSelectors.previewList, '', ['story-info']);
		  const article = createElement('article', li);
		  createElement('h4', article, `Name: ${firstName.value} ${lastName.value}`);
		  createElement('p', article, `Age: ${age.value}`);
		  createElement('p', article, `Title: ${title.value}`);
		  createElement('p', article, `Genre: ${genre.value}`);
		  createElement('p', article, `${story.value}`);
		  const saveBtn = createElement('button', li, 'Save story', ['save-btn']);
		  const editBtn = createElement('button', li, 'Edit story', ['edit-btn']);
		  const deleteBtn = createElement('button', li, 'Delete story', ['delete-btn']);

		  otherDOMSelectors.publishBtn.disabled = true
		  editBtn.addEventListener('click', editBtnHandler);
		  deleteBtn.addEventListener('click', deleteBtnHandler);
		  saveBtn.addEventListener('click', saveBtnHandler);


		  for (const key in inputDOMSelectors) {
			  inputDOMSelectors[key].value = ''
		  }
	  }

	  function deleteBtnHandler() {
			this.parentNode.remove()
		  otherDOMSelectors.publishBtn.disabled = false
	  }
	  function saveBtnHandler() {
		  const main = document.getElementById('main')
		  main.innerHTML = ''
		  createElement('h1', main, 'Your scary story is saved!')
	  }
	  function editBtnHandler() {
		  for (const key in savedInputFields) {
			  inputDOMSelectors[key].value = savedInputFields[key];
		  };
		  otherDOMSelectors.publishBtn.disabled = false;
		  otherDOMSelectors.previewList.innerHTML = '';
		  const ul = createElement('ul', otherDOMSelectors.previewList, '', '', 'preview-list');
		  createElement('h3', ul, 'Preview')
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


