let num1, num2, operator;
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
            return add(num1, num2);
        case '-':
            return subtract(num1, num2);
        case '*':
            return multiply(num1, num2);
        case '/':
            return divide(num1, num2);
        default:
            return undefined;
    }
}

calcbuttons.forEach((button) => {

    button.addEventListener("click", function (e) {

        e.target;

        })
    });

