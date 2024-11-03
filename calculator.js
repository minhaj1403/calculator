const display = document.getElementById('display');
const buttons = document.querySelectorAll('.button');

let firstInput = null;
let secondInput = null;
let operator = null;
let isEnteringSecondInput = false;

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const buttonInput = button.textContent;

        if (button.classList.contains('numbers')) {
            if (display.textContent === '0' || isEnteringSecondInput) {
                display.textContent = buttonInput;
                isEnteringSecondInput = false;   
            } else {
                display.textContent += buttonInput;
            }


            if (operator === null) {
                firstInput = parseFloat(display.textContent);
            } else {
                secondInput = parseFloat(display.textContent);
            }
        }

        else if (button.classList.contains('operators')) {
            if (firstInput !== null && secondInput !== null && operator !== null) {
                firstInput = calculateResult(firstInput, secondInput, operator);
                display.textContent = firstInput;
                secondInput = null;
            }
            operator = buttonInput;
            isEnteringSecondInput = true; 
        }

        else if (button.classList.contains('misc')) {
            switch (buttonInput) {
                case 'C':
                    display.textContent = '0';
                    firstInput = null;
                    secondInput = null;
                    operator = null;
                    isEnteringSecondInput = false;
                    break;
                case '=':
                    if (firstInput !== null && secondInput !== null && operator !== null) {
                        firstInput = calculateResult(firstInput, secondInput, operator);
                        display.textContent = firstInput;
                        secondInput = null;
                        operator = null;
                    }
                    break;
                case 'BS': 
                    if (display.textContent.length > 1) {
                        display.textContent = display.textContent.slice(0, -1);
                    } else {
                        display.textContent = '0';
                    }
                    
                    if (operator === null) {
                        firstInput = parseFloat(display.textContent);
                    } else {
                        secondInput = parseFloat(display.textContent);
                    }
                    break;
            }
        }
    });
});

function calculateResult(a, b, operator) {
    switch (operator) {
        case '+': return add(a, b);
        case '-': return subtract(a, b);
        case '*': return multiply(a, b);
        case '/': return divide(a, b);
    }
}

const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => b === 0 ? 'You do not know Math!' : a / b;
