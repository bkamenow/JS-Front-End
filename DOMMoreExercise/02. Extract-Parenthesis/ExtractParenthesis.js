function extract(content) {
	let text = document.getElementById(content).textContent;
	let regex = /\(([^)]+)\)/g;
	let matches = [];
	let match = '';
	while(match = regex.exec(text)){
		matches.push(match[1]);
	}
	return matches.join('; ');

}