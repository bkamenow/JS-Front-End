function colorize() {
    const elements = Array.from(document.querySelectorAll('tr'));
	elements.shift()

	for (const idx in elements) {
		if (idx % 2 === 0){
			elements[idx].style.backgroundColor = 'Teal'
		}
	}
}