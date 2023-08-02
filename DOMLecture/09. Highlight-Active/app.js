function focused() {
    let inputElements = document.querySelectorAll('div div input');


    for (let element of inputElements) {
        element.addEventListener('focus', (e) => {
            e.target.parentNode.classList.add('focused');
        });

        element.addEventListener('blur', (e) => {
            e.target.parentNode.classList.remove('focused');
        });
    }
}