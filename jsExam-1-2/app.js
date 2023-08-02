window.addEventListener("load", solve);

function solve() {

	const storyState = {
		firstName: null,
		lastName: null,
		age: null,
		storyTitle: null,
		genre: null,
		story: null,
	};

	const inputDOMSelectors = {
		firstName: document.getElementById('first-name'),
		lastName: document.getElementById('last-name'),
		age: document.getElementById('age'),
		storyTitle: document.getElementById('story-title'),
		genre: document.getElementById('genre'),
		story: document.getElementById('story'),
	};

  const publishBtn = document.getElementById('form-btn');
  const previewList = document.getElementById('preview-list');
  const mainDiv = document.getElementById('main');

  publishBtn.addEventListener('click', publishHandler);
  function publishHandler() {
	  const allFieldsHaveValue = Object.values(inputDOMSelectors)
		  .every((input) => input.value !== '');
	  if(!allFieldsHaveValue) {
		  console.log('EMPTY FIELD');
		  return;
	  }

	  const {firstName, lastName, age, storyTitle, genre, story} = inputDOMSelectors;
	  const li = createElement('li','', previewList, null, ['story-info']);
	  const article = createElement('article', null, li,);
	  createElement('h4', `Name: ${firstName.value} ${lastName.value}`, article);
	  createElement('p', `Age: ${age.value}`, article);
	  createElement('p', `Title: ${storyTitle.value}`, article);
	  createElement('p', `Genre: ${genre.value}`, article);
	  createElement('p', story.value, article);
	  const saveBtn = createElement('button', 'Save Story', li, '', ['save-btn']);
	  const editBtn = createElement('button', 'Edit Story', li, '', ['edit-btn']);
	  const deleteBtn = createElement('button', 'Delete Story', li, '', ['delete-btn']);

	  for (const key in inputDOMSelectors) {
		  storyState[key] = inputDOMSelectors[key].value;
	  }
	  clearAllInputs();
	  publishBtn.disabled = 'true';

	  editBtn.addEventListener('click', editButtonHandler);
	  saveBtn.addEventListener('click', saveButtonHandler);
	  deleteBtn.addEventListener('click', deleteButtonHandler);
	}
	function clearAllInputs() {
		Object.values(inputDOMSelectors)
			.forEach((input) => {
				input.value = '';
			})
}

	function saveButtonHandler (){
	  mainDiv.innerHTML = '';
	  createElement('h1', 'YOUR SCARY STORY IS SAVED!', mainDiv);
	}

	function editButtonHandler() {
		for (const key in inputDOMSelectors) {
			inputDOMSelectors[key].value = storyState[key];
		}
		publishBtn.removeAttribute('disabled');
		previewList.innerHTML = '';
		createElement('h3', 'Preview', previewList);
	}

	function deleteButtonHandler() {
		publishBtn.removeAttribute('disabled');
		previewList.innerHTML = '';
		createElement('h3', 'Preview', previewList);
	}

	function createElement(type, content, parentNode, id, classes) {

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


