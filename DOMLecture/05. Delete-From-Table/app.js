function deleteByEmail() {
	const emails = Array.from(document.querySelectorAll("td"))
	const input = document.querySelector('input').value;
	const result = document.getElementById('result');

	for (const email of emails.values()) {
		if (email.textContent === input){
			email.parentElement.innerHTML = '';
			result.textContent = 'Deleted'
		}
	else {
		result.textContent = 'Not found.'
		}
	}
}