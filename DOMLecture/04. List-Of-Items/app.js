function addItem() {
	const items = document.getElementById('items');
	const input = document.querySelector('input');

	const li = document.createElement('li')
	li.innerHTML = input.value
	items.appendChild(li)


	input.value = ''
}

