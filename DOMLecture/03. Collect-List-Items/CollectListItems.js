function extractText() {
	const items = Array.from(document.querySelectorAll('li'));
	const result = document.getElementById('result');

	for (const item of items){
		result.textContent += `${item.textContent}\n`
	}
}

