const screenText = document.querySelector('.screen-text');
const numberBtns = document.querySelectorAll('.number');
const operators = document.querySelectorAll('.operator');
const operateBtn = document.querySelector('.operate');
const deleteBtn = document.querySelector('.delete');
const backspaceBtn = document.querySelector('.backspace');
const reciprocalBtn = document.querySelector('.reciprocal');
const percentBtn = document.querySelector('.percent');
const comaBtn = document.querySelector('.coma')


let firstNumber = null;
let secondNumber = null;
let firstOperator = null;
let secondOperator = null;


let displayValue = "0";
screenText.textContent = displayValue;


let add = (num1, num2) => parseFloat(num1) + parseFloat(num2);

let substract = (num1, num2) => parseFloat(num1) - parseFloat(num2);

let multiply = (num1, num2) => parseFloat(num1) * parseFloat(num2);

let divide = (num1, num2) => parseFloat(num1) / parseFloat(num2);

let operate = (operator, num1, num2) => {
   let output;
   let decimals = 1000000000
   if (operator === "+") {
      output = add(num1, num2)
   } else if (operator === "-") {
      output = substract(num1, num2)
   } else if (operator === "*") {
      output = multiply(num1, num2)
   } else if (operator ==="/" && num2==0) {
      return "But Sir, you can't divide by 0..."
   } else if (operator === "/") {
      output = divide(num1, num2)
   } else return screenText.textContent;
   return Math.round(output * decimals) / decimals
}

numberBtns.forEach(btn => btn.addEventListener('click', () => {
   // Reseting screen if it says NaN or divided by 0
   if (screenText.textContent.includes('a')) {
      screenText.textContent = null
   }
   screenText.textContent += btn.textContent;
   if (screenText.textContent.length > 1 && screenText.textContent[0] == "0") {
      screenText.textContent = screenText.textContent.slice(1)
   }
}))


operators.forEach(btn => btn.addEventListener('click', () => {
   if(firstNumber !== null) {
      secondOperator = btn.textContent;
      let result = operate(firstOperator, firstNumber, screenText.textContent);
      firstNumber = result;
      screenText.textContent = null;
      firstOperator = secondOperator;
   } else {
      firstNumber = screenText.textContent;
      screenText.textContent = null;
      firstOperator = btn.textContent;
   }
}))

operateBtn.addEventListener('click', () => {
   let result = operate(firstOperator, firstNumber, screenText.textContent)
   screenText.textContent = result;
   firstNumber = null;
   firstOperator = null;
})

deleteBtn.addEventListener('click', () => {
   firstNumber = null;
   secondNumber = null;
   firstOperator = null;
   secondOperator = null;
   screenText.textContent = 0;
})

backspaceBtn.addEventListener('click', () => {
   screenText.textContent = screenText.textContent.slice(0,-1);
})

reciprocalBtn.addEventListener('click', () => {
   screenText.textContent = parseFloat(screenText.textContent) * -1;
})

percentBtn.addEventListener('click', () => {
   screenText.textContent = parseFloat(screenText.textContent) / 100;
})

comaBtn.addEventListener('click', () => {
   if (screenText.textContent.includes('.')) return;
   screenText.textContent += "."
})

window.addEventListener('keydown', (e) => {
   const key = document.querySelector(`button[data-key='${e.key}']`)
   if (!key) return;
   key.click();
} )