function attachEvents() {
    const icons = {
        'Sunny': '☀',
        'Partly sunny': '⛅',
        'Overcast': '☁',
        'Rain': '☂',
        'Degrees': '°'
    }
    const BASE_URL = 'http://localhost:3030/jsonstore/forecaster/';

    const inputLocation = document.getElementById('location');
    const forecastContainer = document.getElementById('forecast')
    const currentContainer = document.getElementById('current');
    const upcomingContainer = document.getElementById('upcoming');
    const submitBtn = document.getElementById('submit');

    submitBtn.addEventListener('click', getWhether);

    const city = {
        code: '',
        name: ''
    }

    function getWhether() {
        forecastContainer.style.display = 'block'
        try {
            fetch(`${BASE_URL}locations`)
                .then((res) => res.json())
                .then((data) => {
                    for (const {code, name} of data) {
                        if (name === inputLocation.value) {
                            city.code = code
                            city.name = name
                            break
                        }
                    }
                })
                .then(todayWhether)
                .then(upcomingWhether)
        } catch(Error){
                forecastContainer.innerHTML = ''
                forecastContainer.textContent = 'Error'
            }



    }
    function todayWhether(){
        fetch(`${BASE_URL}today/${city.code}`)
            .then((res) => res.json())
            .then((data) => {
                let name = data['name'];
                let { low, high, condition} = data['forecast'];

                const div = createElement('div', currentContainer, '', ['forecasts']);
                createElement('span', div, `${icons[condition]}`, ['condition', 'symbol']);
                const span = createElement('span', div, '', ['condition']);
                createElement('span', span, `${name}`, ['forecast-data']);
                createElement('span', span, `${low}${icons['Degrees']}/${high}${icons['Degrees']}`, ['forecast-data']);
                createElement('span', span, `${condition}`, ['forecast-data']);
            })
    }
    function upcomingWhether() {
        fetch(`${BASE_URL}upcoming/${city.code}`)
            .then((res) => res.json())
            .then((data) => {

                let forecast = data['forecast'];

                const div = createElement('div', upcomingContainer, '', ['forecast-info']);
                for (const forecastElement of forecast) {
                    let { low, high, condition} = forecastElement;
                    const spanUpcoming = createElement('span', div, '', ['upcoming']);
                    createElement('span', spanUpcoming, `${icons[condition]}`, ['symbol']);
                    createElement('span', spanUpcoming, `${low}${icons['Degrees']}/${high}${icons['Degrees']}`, ['forecast-data']);
                    createElement('span', spanUpcoming, `${condition}`, ['forecast-data']);
                }
            })
    }

    function createElement(type, parentNode, content, classes) {

        const htmlElement = document.createElement(type);

        if(content && type !== 'input') {
            htmlElement.textContent = content;
        }
        if(content && type === 'input') {
            htmlElement.value = content;
        }
        if(parentNode) {
            parentNode.appendChild(htmlElement);
        }

        if(classes) {
            htmlElement.classList.add(...classes);
        }

        return htmlElement
    }


}

attachEvents();