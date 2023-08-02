function solve() {
	const tdElements = Array.from(document.querySelectorAll('tbody > tr > td'))
	const searchInput = document.getElementById('searchField');
	const searchBtn = document.getElementById('searchBtn');


	searchBtn.addEventListener('click', searchHandler)

	function searchHandler() {
		const selected = Array.from(document.getElementsByClassName('select'))
		if (selected){
			for (const element of selected) {
				element.className = ''
			}
		}

		for (const td of tdElements) {
			if (td.textContent.includes(searchInput.value)){
				td.parentNode.className = 'select'
			}
		}
		searchInput.value = ''
	}


}