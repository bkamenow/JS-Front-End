function addItem() {
	const items = document.getElementById('items');
	const input = document.querySelector('input');

	const li = document.createElement('li')
	const link = document.createElement('a')
	link.href = '#'
	link.innerHTML = '[Delete]'
	li.innerHTML = input.value
	li.appendChild(link)
	items.appendChild(li)
	input.value = ''

	link.addEventListener('click', deleteHandler);

	function deleteHandler() {
		this.parentElement.remove()
	}
}