function create(words) {
	const divContainer = document.getElementById('content');

	for (const word of words) {
		const newDiv = document.createElement('div');
		const p = document.createElement('p');
		p.textContent = word;
		p.style.display = 'none';
		newDiv.appendChild(p)
		newDiv.addEventListener('click', showText)

		divContainer.appendChild(newDiv);
	}

	function showText() {
		this.firstChild.style.display = 'block'
	}
}