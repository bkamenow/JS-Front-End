function sumTable() {
	const elements = Array.from(document.querySelectorAll('td'));
	const sum = document.getElementById('sum');
	elements.pop()
	elements.pop()

	let total = 0;

	for (const idx in elements) {
		if (idx % 2 !== 0){
			total += Number(elements[idx].textContent)
		}
	}

	sum.textContent = String(total)
}