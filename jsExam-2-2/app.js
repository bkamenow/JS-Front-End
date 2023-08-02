window.addEventListener('load', solve);

function solve() {
	let totalLikes = 0;

	function createElement(type, content, parentNode, id, classes, attributes) {
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

		if(attributes) {
			for (const key in attributes) {
				htmlElement.setAttribute(key, attributes[key]);
			}

		}

		return htmlElement
	}

    const inputDOMSelectors = {
		genre: document.getElementById('genre'),
	    songName: document.getElementById('name'),
	    author: document.getElementById('author'),
	    date: document.getElementById('date'),
    }

	const addBtn = document.getElementById('add-btn');

	const allDOMContainers = {
		collectionSongs: document.querySelector('.all-hits-container'),
		savedSongs: document.querySelector('.saved-container'),
		likes: document.querySelector('.likes > p'),
	}



	addBtn.addEventListener('click', addSongHandler);


	function addSongHandler(event) {
		event.preventDefault()
		const allFieldsHaveValue = Object.values(inputDOMSelectors)
			.every((input) => input.value !== '');
		if(!allFieldsHaveValue) {
			console.log('EMPTY FIELD');
			return;
		}

		const { genre, songName, author, date } = inputDOMSelectors;
		const songContainer = createElement('div', '', allDOMContainers.collectionSongs, '', ['hits-info'])
		createElement('img', '', songContainer, '', '', {src: './static/img/img.png'});
		createElement('h2', `Genre: ${genre.value}`, songContainer);
		createElement('h2', `Name: ${songName.value}`, songContainer);
		createElement('h2', `Author: ${author.value}`, songContainer);
		createElement('h3', `Date: ${date.value}`, songContainer);
		const saveBtn = createElement('button', 'Save song', songContainer, '', ['save-btn']);
		const likeBtn = createElement('button', 'Like song', songContainer, '', ['like-btn']);
		const deleteBtn = createElement('button', 'Delete', songContainer, '', ['delete-btn']);
		likeBtn.addEventListener('click', likeSongHandler);
		deleteBtn.addEventListener('click', deleteSongHandler);
		saveBtn.addEventListener('click', saveSongHandler);
		clearAllInputs();

	}
	function deleteSongHandler() {
		this.parentNode.remove();
	}
	function likeSongHandler() {
		this.setAttribute('disabled', true);
		totalLikes++;
		allDOMContainers.likes.textContent = `Total Likes: ${totalLikes}`

	}

	function saveSongHandler() {
		const songRef = this.parentNode;
		const saveBtn = songRef.querySelector('.save-btn');
		const likeBtn = songRef.querySelector('.like-btn');
		allDOMContainers.savedSongs.appendChild(songRef);

		saveBtn.remove();
		likeBtn.remove();
	}

	function clearAllInputs() {
		Object.values(inputDOMSelectors)
			.forEach((input) => {
				input.value = '';
			})
	}
}

