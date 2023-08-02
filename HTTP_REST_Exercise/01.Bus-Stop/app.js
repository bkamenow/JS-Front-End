function getInfo() {
	const BASE_URL = 'http://localhost:3030/jsonstore/bus/businfo/'
	const stopIdInput = document.getElementById('stopId').value;
	const stopName = document.getElementById('stopName');
	const busesContainer = document.getElementById('buses');

	stopName.textContent = ''
	busesContainer.innerHTML = ''

	fetch(`${BASE_URL}${stopIdInput}`)
		.then((response) => response.json())
		.then(function (data) {
				stopName.textContent = data['name']

				let buses = data['buses']

			for (const bus in buses) {
				const li = document.createElement('li')
				li.textContent = `Bus ${bus} arrives in ${buses[bus]} minutes`
				busesContainer.appendChild(li)
			}
			}
		)
		.catch(() => stopName.textContent = 'Error')

}