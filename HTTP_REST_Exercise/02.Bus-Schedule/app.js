function solve() {
	const BASE_URL = 'http://localhost:3030/jsonstore/bus/schedule/';
	const departBtn = document.getElementById('depart');
	const arriveBtn = document.getElementById('arrive');
	const infoContainer = document.querySelector('#info > span');

	let nextStopId = 'depot';
	let stopName = null


    function depart() {
        departBtn.disabled = true
	    arriveBtn.disabled = false

	    fetch(`${BASE_URL}${nextStopId}`)
		    .then((res) => res.json())
		    .then((data) => {
				const {name, next} = data
				stopName = name
			    infoContainer.textContent = `Next stop ${name}`
			    nextStopId = next
			})
		    .catch(() => {
				infoContainer.textContent = 'Error'
			    departBtn.disabled = true
			    arriveBtn.disabled = true
		    })
    }

    async function arrive() {
	    departBtn.disabled = false
	    arriveBtn.disabled = true

	    infoContainer.textContent = `Arriving at ${stopName}`
    }

    return {
        depart,
        arrive
    };
}

let result = solve();