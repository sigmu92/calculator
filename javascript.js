
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
    if (firstNum == "" ){
        return
    }
    if (selectedOp == "") {
        selectedOp = e.target.textContent
    }   else {
        crunch()
        selectedOp = e.target.textContent;
    }  
    opSel()
}

function opSel(){
    operators.forEach(function(operator) {
        if (operator.textContent==selectedOp){
            operator.classList.add("selected")
        }
    })
}

function opDel(){
    operators.forEach(operator => operator.classList.remove("selected"))
}

function crunch() {
    if (firstNum == "") {
        return
    }
    let num1 = parseFloat(firstNum);
    let num2 = 0;
    if (secondNum == "") {
        num2 = num1;
    } else {
        num2 = parseFloat(secondNum)
    }
    num1 = Math.round(1000 * operate(selectedOp,num1,num2)) / 1000;
    firstNum = num1.toString();
    secondNum = ""
    opDel()
    selectedOp = ""
    
    updateDisplay(firstNum)
}

function changeSign() {
    let number = outputDisplay.textContent
    if (number == firstNum) {
        let num = parseFloat(firstNum)
        num *= -1;
        firstNum = num.toString()
        updateDisplay(firstNum)
    } else {
        let num = parseFloat(secondNum)
        num *= -1;
        secondNum = num.toString()
        updateDisplay(secondNum)
    }
}


function clear() {
    displayNum = "0"
    firstNum = ""
    secondNum = ""
    selectedOp = ""
    updateDisplay(displayNum)
    opDel()
}

function backSpace() {
    let number = outputDisplay.textContent
    if (number == firstNum) {
        firstNum = firstNum.slice(0, firstNum.length - 1)
        updateDisplay(firstNum)
    } else {
        secondNum = secondNum.slice(0, secondNum.length - 1)
        updateDisplay(secondNum)
    }
}

function decimalAdd() {
    let number = outputDisplay.textContent
    if (number == firstNum) {
        let chars = firstNum.split("");
        if (chars.includes(".")) {
            return
        } else {
            chars.push('.')
            firstNum = chars.join("")
            updateDisplay(firstNum)
        }
    } else {
        let chars = secondNum.split("");
        if (chars.includes(".")) {
            return
        } else {
            chars.push('.')
            secondNum = chars.join("")
            updateDisplay(secondNum)
        }
    }
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

const plusMinus = document.querySelector('.plus-minus');
plusMinus.addEventListener('click', changeSign)

const backspace = document.querySelector('.backspace')
backspace.addEventListener("click", backSpace)

const decimal = document.querySelector('.dot');
decimal.addEventListener("click", decimalAdd);

window.addEventListener('load', updateDisplay("0"))