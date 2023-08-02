class Storage {
	constructor(capacity) {
		this.capacity = capacity;
	}

	storage = {
		name: null,
		price: null,
		quantity: null
	};
	totalCost = 0;

	addProduct(product){
		this.storage = product
		this.capacity += product.quantity
		this.totalCost += product.price
	}

	getProducts(storage){
		for (const storageKey in storage) {
			console.log(storage.JSON.parse(storageKey))
		}
	}

}

let productOne = {name: 'Cucamber', price: 1.50, quantity: 15};
let productTwo = {name: 'Tomato', price: 0.90, quantity: 25};
let productThree = {name: 'Bread', price: 1.10, quantity: 8};
let storage = new Storage(50);
storage.addProduct(productOne);
storage.addProduct(productTwo);
storage.addProduct(productThree);
console.log(storage.getProducts());
console.log(storage.capacity);
console.log(storage.totalCost);
