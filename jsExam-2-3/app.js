window.addEventListener('load', solve);
function solve() {

	const BASE_URL = 'http://localhost:3030/jsonstore/grocery/';
	const inputDOMSelectors = {
		product: document.getElementById('product'),
		count: document.getElementById('count'),
		price: document.getElementById('price'),
	};

	const buttonsDOMSelectors = {
		addBtn: document.getElementById('add-product'),
		upgradeBtn: document.getElementById('update-product'),
		loadBtn: document.getElementById('load-product'),
	};

	const tbody = document.getElementById('tbody');

	buttonsDOMSelectors.addBtn.addEventListener('click', addBtnHandler);
	buttonsDOMSelectors.upgradeBtn.addEventListener('click', upgradeBtnHandler);
	buttonsDOMSelectors.loadBtn.addEventListener('click', loadBtnHandler);

	function addBtnHandler(event){
		if (event) {
			event.preventDefault();
		}

		const allFieldsHaveValue = Object.values(inputDOMSelectors)
			.every((input) => input.value !== '');
		if(!allFieldsHaveValue) {
			console.log('EMPTY FIELD');
			return;
		}

		const {product, count, price} = inputDOMSelectors;
		const payload = JSON.stringify({
			product: product.value,
			count: count.value,
			price: price.value,
		})

		const httpHeaders = {
			method: 'POST',
			body: JSON.stringify({payload})
		}

		fetch(BASE_URL, httpHeaders)
			.then(() => {
				loadBtnHandler();
				Object.values(inputDOMSelectors)
					.forEach((input) => {
						input.value = '';
					})
			})
			.catch((err) => {
				console.error(err);
			})
	}

	function upgradeBtnHandler(event){
		if (event) {
			event.preventDefault();
		}
	}

	function loadBtnHandler(event) {
		if (event) {
			event.preventDefault();
		}

		tbody.innerHTML = ''
		fetch(BASE_URL)
			.then((res) => res.json())
			.then((dataProducts) => {
				const products = Object.values(dataProducts);
				for (const {product, count, price, _id} of products) {
					const tr = createElement('tr', tbody, '', '', _id);
					createElement('td', tr, product, ['name']);
					createElement('td', tr, count, ['count-product']);
					createElement('td', tr, price, ['product-price']);
					const btnTd = createElement('td', tr, '', ['btn']);
					const upgradeBtn = createElement('button', btnTd, 'Upgrade', ['upgrade']);
					const deleteBtn = createElement('button', btnTd, 'Delete', ['delete']);
					upgradeBtn.addEventListener('click');
					deleteBtn.addEventListener('click', deleteBtnHandler);
				}
			})
			.catch((err) => {
				console.error(err);
			})

		function deleteBtnHandler() {
			// const id = this.parentNode.parentNode.id;
			// const httpHeaders = {
			// 	method: 'DELETE'
			// };
			//
			// fetch(`${BASE_URL}${id}`, httpHeaders)
			// 	.then(() => loadBtnHandler())
			// 	.catch((err) => {
			// 		console.error(err);
			// 	})
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