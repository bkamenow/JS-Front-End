window.addEventListener('load', solve);

function solve() {
	function createElement(type, parentNode, id, content, classes) {

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

	const inputDOMSelectors = {
	   firstName: document.getElementById('first-name'),
	   lastName: document.getElementById('last-name'),
	   peopleCount: document.getElementById('people-count'),
	   fromDate: document.getElementById('from-date'),
	   daysCount: document.getElementById('days-count'),
   }

   const otherDOMSelectors = {
	   nextStepBtn: document.getElementById('next-btn'),
	   infoContainer: document.querySelector('.ticket-info-list'),
	   confirmContainer: document.querySelector('.confirm-ticket'),
	   mainContainer: document.getElementById('main'),
	   bodyContainer: document.getElementById('body'),
   }

   otherDOMSelectors.nextStepBtn.addEventListener('click', nextStepHandler);
   let inputInfo = {}
   function nextStepHandler(event){
	   event.preventDefault()
	   const allFieldsHaveValue = Object.values(inputDOMSelectors)
		   .every((input) => input.value !== '');
	   if(!allFieldsHaveValue) {
		   console.log('EMPTY FIELD');
		   return;
	   }

	   const { firstName, lastName, peopleCount, fromDate, daysCount } = inputDOMSelectors;
	   inputInfo = {
		   firstName: firstName.value,
		   lastName: lastName.value,
		   peopleCount: peopleCount.value,
		   fromDate: fromDate.value,
		   daysCount: daysCount.value,
	   }

	   const li = createElement('li', otherDOMSelectors.infoContainer, '', '' ['ticket']);
	   const article = createElement('article', li);
	   createElement('h3', article,'', `Name: ${firstName.value} ${lastName.value}`);
	   createElement('p', article,'', `From date: ${fromDate.value}`);
	   createElement('p', article,'', `For ${daysCount.value} days`);
	   createElement('p', article,'', `For ${peopleCount.value} people`);
	   const editBtn = createElement('button', li, '', 'Edit', ['edit-btn']);
	   const continueBtn = createElement('button', li, '', 'Continue', ['continue-btn']);
	   editBtn.addEventListener('click', editBtnHandler);
	   continueBtn.addEventListener('click', continueBtnHandler);
	   clearAllInputs();
	   otherDOMSelectors.nextStepBtn.disabled = true;


   }

   function editBtnHandler(){
	   for (const key in inputDOMSelectors) {
		   inputDOMSelectors[key].value = inputInfo[key];
	   }
	   otherDOMSelectors.nextStepBtn.disabled = false;
	   otherDOMSelectors.infoContainer.innerHTML = '';
   }
   function continueBtnHandler() {
	   const ticketRef = this.parentNode;
	   const editBtn = ticketRef.querySelector('.edit-btn');
	   const continueBtn = ticketRef.querySelector('.continue-btn');
	   otherDOMSelectors.confirmContainer.appendChild(ticketRef);
	   editBtn.remove();
	   continueBtn.remove();

	   const confirmBtn = createElement('button', ticketRef, '', 'Confirm', ['confirm-btn']);
	   const cancelBtn = createElement('button', ticketRef, '', 'Cancel', ['cancel-btn']);

	   confirmBtn.addEventListener('click', confirmBtnHandler);
	   cancelBtn.addEventListener('click', cancelBtnHandler);
   }

   function confirmBtnHandler(){
		otherDOMSelectors.mainContainer.remove();
		createElement('h1', otherDOMSelectors.bodyContainer, 'thank-you', 'Thank you, have a nice day!');
		const backBtn = createElement('button', otherDOMSelectors.bodyContainer, 'back-btn', 'Back');
		backBtn.addEventListener('click', backBtnHandler)

   }
   function backBtnHandler(){
	   window.location.reload();
   }
   function cancelBtnHandler(){
	   otherDOMSelectors.confirmContainer.innerHTML = '';
	   otherDOMSelectors.nextStepBtn.disabled = false;

   }
   function clearAllInputs() {
	   Object.values(inputDOMSelectors)
		   .forEach((input) => {
			   input.value = '';
		   })
	}
}



    
