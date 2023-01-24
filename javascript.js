
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
    console.log(selectedOp)
    if (selectedOp == "") {
        firstNum += inputData
        updateDisplay(firstNum);
    } else {
        secondNum += inputData;
        updateDisplay(secondNum);
    }
}

function compute(e){
    console.log(e)
    if (selectedOp == "") {
        selectedOp = e.target.textContent
    }   else {
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
        selectedOp = e.target.textContent;
        console.log(firstNum)
        updateDisplay(firstNum)
    }
    
}




function clear() {
    displayNum = "0"
    firstNum = ""
    secondNum = ""
    selectedOp = ""
    updateDisplay(displayNum)
}



const numbers = document.querySelectorAll('.number');
numbers.forEach(number => number.addEventListener('click', retreiveNum));

const operators = document.querySelectorAll('.operator');
operators.forEach(operator => operator.addEventListener('click', compute));

const outputDisplay = document.querySelector('.output')

const clearButton = document.querySelector('.clear')
clearButton.addEventListener('click', clear);

window.addEventListener('load', updateDisplay("0"))