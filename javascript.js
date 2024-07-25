let num1, num2, operator;
let displayValue = '';
let currentDigit;
let resultOnDisplay = false;

const display = document.querySelector(".display");
const calcbuttons = document.querySelectorAll(".calcbutton");

const add = function(num1, num2) {
    return num1 + num2;
}

const subtract = function(num1, num2) {
    return num1 - num2;
}

const multiply = function(num1, num2) {
    return num1 * num2;
}

const divide = function(num1, num2) {
    return num1 / num2;
}

const operate = function(num1, num2, operator) {
    switch(operator) {
        case '+':
            return add(Number(num1), Number(num2));
        case '-':
            return subtract(Number(num1), Number(num2));
        case 'x':
            return multiply(Number(num1), Number(num2));
        case '/':
            return divide(Number(num1), Number(num2));
        default:
            return undefined;
    }
}

const pressDigit = function(pressedDigit) {
    console.log(pressedDigit, currentDigit);
    if(currentDigit == undefined || currentDigit == '0' || resultOnDisplay == true) {
                
        if(pressedDigit == '.') {
            currentDigit = '0.';
            displayValue = '0.';
        } else {
            currentDigit = pressedDigit;
            displayValue = pressedDigit;
        }
        display.textContent = displayValue;
        resultOnDisplay = false;
    } else if(pressedDigit == '.' && currentDigit.includes('.')) { // Prevent adding a second comma

    } else if(currentDigit.length > 12) { // Prevent display overflow

    } else if(!currentDigit.includes(".") && currentDigit == '0' && pressedDigit == '0') { // Prevent adding extra zeroes pre-comma

    } else {
        currentDigit = currentDigit.concat(pressedDigit);
        displayValue = displayValue.concat(pressedDigit);
        display.textContent = displayValue;
    }
}

const pressOperator = function(pressedOperator) {
    if(currentDigit == undefined && num1 == undefined) { // Check if user has not yet input anything

    } else if(num2 != undefined || (currentDigit != undefined && num1 != undefined)) { // Check if user has already input a first number, an operator, and begun the second number OR has already input both numbers

    } else {
        if(num1 == undefined) { // If the first number has not yet been set, set it
            if(currentDigit.slice(-1) == '.') { // Add a 0 if the current digit ends in a comma
                currentDigit = currentDigit.concat('0');
            }
            num1 = currentDigit;
            currentDigit = undefined; // Reset current digit
        }
        operator = pressedOperator;
        displayValue = operator;
        display.textContent = displayValue;
        resultOnDisplay = false;
    }
}

const getDisplayResult = function(result) {
    let roundTo;
    let resultString = result.toString();

        if(resultString.includes('.') && result.toFixed(11).toString().slice(-9) == '000000000'){ // Remove extra zeroes from floats
            result = result.toFixed(2);
            resultString = result.toString();
        }
        console.log("b4 calcing, length of res", resultString.includes("."));
        if(resultString.length > 12) {
            if(resultString.includes(".")) {
                let beforeDecimalpoint = resultString.split(".")[0];
                let afterDecimalpoint = resultString.split(".")[1];
                console.log("splits", beforeDecimalpoint, afterDecimalpoint, beforeDecimalpoint.length < 12);
                if(beforeDecimalpoint.length == 12) {
                    roundTo = 0;
                } else if(beforeDecimalpoint.length < 12) {
                    roundTo = 11 - beforeDecimalpoint.length;
                    console.log("calcing roundto", roundTo);
                } else {
                    return expo(result, 2).toString();
                }
            } else {
                return expo(result, 2).toString();
            }

        } else {
            return result.toString();
        }
    console.log("after getdisplay, bottom", result.toFixed(roundTo).toString());
    return result.toFixed(roundTo).toString();
}

const pressEquals = function() {
    if(Number(currentDigit) == 0 && operator == '/') {
        displayValue = "KAB0000M";
        display.textContent = displayValue;
        num1 = undefined;
        num2 = undefined;
        operator = undefined;
        currentDigit = undefined;
        return;

    }
    if(num1 != undefined && operator != undefined && currentDigit != undefined) { // The equals button does nothing unless there is a first number, an operator, and a current digit
        let result;
        if(currentDigit.slice(-1) == '.') { // Add a 0 if the current digit ends in a comma
            currentDigit = currentDigit.concat('0');
        }
        num2 = currentDigit;
        result = operate(num1, num2, operator);
        console.log("Javas calc", result);
        
        displayValue = getDisplayResult(result);
        currentDigit = displayValue;
        display.textContent = displayValue;
        resultOnDisplay = true;
        num1 = undefined;
        num2 = undefined;
        operator = undefined;
    }
}

const clear = function() {
    displayValue = '';
    display.textContent = displayValue;
    resultOnDisplay = false;
    currentDigit = undefined;
    num1 = undefined;
    num2 = undefined;
    operator = undefined;
}

const toggleSign = function() {
    if(currentDigit != undefined && resultOnDisplay == false) {
        currentDigit = (Number(currentDigit) * -1).toString();
        displayValue = currentDigit;
        display.textContent = displayValue;
    }
}

const del = function() {
    if(resultOnDisplay) {
        clear();
        resultOnDisplay == false;
    } else if (currentDigit != undefined) {
        currentDigit = currentDigit.slice(0, -1);
        displayValue = currentDigit;
        if(currentDigit == '' || currentDigit == '-') { // If after deletion the current digit is "-" or empty, set empty display and undefined current digit
            currentDigit = undefined;
            displayValue = '';
        }
        display.textContent = displayValue;
    }
}

const expo =function (x, f) {
    return Number.parseFloat(x).toExponential(f);
  }

calcbuttons.forEach((button) => {

    button.addEventListener("click", function (e) {
        let pressedButton = e.target.textContent;

        if(e.target.classList.contains("digit")) {
            pressDigit(pressedButton);
        } else if (e.target.textContent == 'AC') {
            clear();
        } else if (e.target.classList.contains("operator")) {
            pressOperator(pressedButton);
        }  else if (e.target.textContent == '=') {
            pressEquals();
        } else if(e.target.textContent == '+/-') {
            toggleSign();
        } else if(e.target.textContent == 'DEL') {
            del();
        }
        
        console.log(displayValue, currentDigit, num1, num2, operator);
        })
    });

