function addItem() {
	const mainContainer = document.getElementById('menu');
	const newItemText = document.getElementById('newItemText');
	const newItemValue = document.getElementById('newItemValue');

	const option = document.createElement('option');
	option.textContent = newItemText.value;
	option.value = newItemValue.value;

	mainContainer.appendChild(option)

	newItemValue.value = ''
	newItemText.value = ''
}