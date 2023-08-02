function solve() {
	const [inputText, buyText] = Array.from(document.querySelectorAll('textarea'));
	const [generateBtn, buyBtn] = Array.from(document.querySelectorAll('button'));
	const tbody = document.querySelector('tbody')
	generateBtn.addEventListener('click', generateBtnHandler);
	buyBtn.addEventListener('click', buyBtnHandler)

	function buyBtnHandler(){
		const checkbox= Array.from(document.querySelectorAll('input'));
		let furnitureList = [];
		let totalPrice = 0;
		let averageDecList = [];
		let totalDec = 0

		for (const box of checkbox) {
			if (box.checked){
				let parent = Array.from(box.parentNode.parentNode.querySelectorAll('td'))
				parent.shift()
				parent.pop()

				let counter = 0;
				for (const el of parent) {
					let elValue = el.firstChild.textContent
					if (counter === 0){
						counter += 1;
						furnitureList.push(elValue)
					}else if (counter === 1){
						counter += 1;
						totalPrice += Number(elValue)

					}else if (counter === 2){
						counter = 0
						averageDecList.push(Number(elValue))
					}

				}
			}
		}

		for (const el of averageDecList) {
			totalDec += el
		}
		totalDec /= averageDecList.length

		buyText.textContent = `Bought furniture: ${furnitureList.join(', ')}\nTotal price: ${totalPrice.toFixed(2)}\nAverage decoration factor: ${totalDec}`


	}

	function generateBtnHandler() {
		const data = JSON.parse(inputText.value);
		for (const { img, name, price, decFactor } of data) {
			const tableRow = createElement('tr', tbody);
			const imgTd = createElement('td', tableRow);
			const image = createElement('img', imgTd);
			image.src = img;
			const nameTd = createElement('td', tableRow);
			createElement('p', nameTd, name);
			const priceTd = createElement('td', tableRow);
			createElement('p', priceTd, price);
			const decFactorTd = createElement('td', tableRow);
			createElement('p', decFactorTd, decFactor);
			const checkboxTd = createElement('td', tableRow);
			const checkbox = createElement('input', checkboxTd);
			checkbox.setAttribute('type', 'checkbox');
		}


	}


	function createElement(type, parentNode, content, classes, id) {

		const htmlElement = document.createElement(type);

		if(content && type !== 'input') {
			htmlElement.textContent = content;
		}
		if(content && type === 'input') {
			htmlElement.value = content;
		}

		if(id) {
			htmlElement.id = id;
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



