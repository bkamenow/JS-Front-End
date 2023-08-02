function lockedProfile() {
	const showMoreBtn = Array.from(document.querySelectorAll('button'));

	for (const btn of showMoreBtn) {
		console.log(btn)
		btn.addEventListener('click', showMoreLessHandler);
	}

	function showMoreLessHandler() {
		const hiddenDiv = Array.from(this.parentNode.childNodes)[18]
		const unlockCheck = Array.from(this.parentNode.childNodes)[9]
		if (unlockCheck.checked){
			switch (this.textContent) {
				case 'Show more':
					hiddenDiv.style.display = 'block'
					this.textContent = 'Hide it'
					break;
				case 'Hide it':
					hiddenDiv.style.display = 'none'
					this.textContent = 'Show more'
					break;
			}
		}
	}
}
