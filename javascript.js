
let selectedOp = "";
let firstNum = ""
let secondNum = "";
let displayNum = "0";


function add (a,b){
    return (a + b);
}

function subtract (a,b){
    return (a - b);
}

function multiply (a,b){
    return (a * b);
}

function divide (a,b){
    return (a / b);
}

function operate(operator, num1, num2) {
    
    switch (operator) {
        case "+":
            return (add(num1,num2))
        case "-":
            return (subtract(num1,num2))
        case "*":
            return (multiply(num1,num2))
        case "/":
            if (num2 == 0){
                error();
            } else {
                return (divide(num1,num2))  
            }
             
    }
}


function updateDisplay(number) {
    outputDisplay.textContent = number;
}

function error() {
    firstNum = "";
    secondNum = "";
    selectedOp = "";
    updateDisplay("ERROR")

}


function retreiveNum(e){
    let inputData = e.target.textContent
    if (selectedOp == "") {
        firstNum += inputData
        updateDisplay(firstNum);
    } else {
        secondNum += inputData;
        updateDisplay(secondNum);
    }
}

function compute(e){
    if (selectedOp == "") {
        selectedOp = e.target.textContent
    }   else {
        crunch()
        selectedOp = e.target.textContent;
    }  
}

function crunch() {
    if (firstNum == "") {
        return
    }
    let num1 = parseInt(firstNum);
    let num2 = 0;
    if (secondNum == "") {
        num2 = num1;
    } else {
        num2 = parseInt(secondNum)
    }
    num1 = operate(selectedOp,num1,num2);
    firstNum = num1.toString();
    secondNum = ""
    selectedOp = ""
    updateDisplay(firstNum)
}


function clear() {
    
    displayNum = "0"
    firstNum = ""
    secondNum = ""
    selectedOp = ""
    updateDisplay(displayNum)
}

function depressed(e){
    let button = e.target;
    button.classList.add('depressed')
}

function released(e){
    let button = e.target;
    button.classList.remove('depressed')

}
const pushButtons = document.querySelectorAll('.push-button');
pushButtons.forEach(function(button) {
    button.addEventListener('mousedown', depressed)
    button.addEventListener('mouseup', released)

})


 


const numbers = document.querySelectorAll('.number');
numbers.forEach(number => number.addEventListener('click', retreiveNum));

const operators = document.querySelectorAll('.operator');
operators.forEach(operator => operator.addEventListener('click', compute));

const outputDisplay = document.querySelector('.output')

const clearButton = document.querySelector('.clear')
clearButton.addEventListener('click', clear);

const equalButton = document.querySelector('.equal');
equalButton.addEventListener('click', crunch)


window.addEventListener('load', updateDisplay("0"))