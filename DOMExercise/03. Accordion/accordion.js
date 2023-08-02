function toggle() {

	const btn = document.querySelector('span');
	const extra = document.getElementById('extra');

	switch (btn.textContent) {
		case 'More':
			btn.textContent = 'Less';
			extra.style.display = 'block'
			break;
		case 'Less':
			btn.textContent = 'More';
			extra.style.display = 'none'
			break;
	}
}
