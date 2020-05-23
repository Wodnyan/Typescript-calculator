var buttons = document.querySelector(".buttons");
var previousOperandElement = document.querySelector(".display__top");
var currentOperandElement = document.querySelector(".display__bottom");
var clearButton = document.querySelector(".clear-btn");
var equalButton = document.querySelector(".equal");
var Calculator = /** @class */ (function () {
    function Calculator(previousOperand, currentOperand) {
        this.currentOperand = currentOperand;
        this.previousOperand = previousOperand;
        this.operation;
    }
    Calculator.prototype.clear = function () {
        this.currentOperand.textContent = "";
        this.previousOperand.textContent = "";
        this.operation = null;
    };
    Calculator.prototype.updateDisplay = function (str) {
        if (this.currentOperand.textContent.indexOf(".") !== -1 && str === ".")
            return;
        this.currentOperand.textContent += str;
    };
    Calculator.prototype.setOperation = function (operation) {
        this.operation = operation;
        this.previousOperand.textContent = this.currentOperand.textContent;
        this.currentOperand.textContent = "";
    };
    Calculator.prototype.reset = function () {
        this.previousOperand.textContent = "";
        this.operation = null;
    };
    Calculator.prototype.calculate = function () {
        var parsedCurrentOperand = parseFloat(this.currentOperand.textContent);
        var parsedPreviousOperand = parseFloat(this.previousOperand.textContent);
        if (isNaN(parsedPreviousOperand) || isNaN(parsedCurrentOperand))
            return this.clear();
        switch (this.operation) {
            case "+":
                this.currentOperand.textContent = "" + (parsedPreviousOperand + parsedCurrentOperand);
                this.reset();
                break;
            case "-":
                this.currentOperand.textContent = "" + (parsedPreviousOperand - parsedCurrentOperand);
                this.reset();
                break;
            case "÷":
                this.currentOperand.textContent = "" + parsedPreviousOperand / parsedCurrentOperand;
                this.reset();
                break;
            case "x":
                this.currentOperand.textContent = "" + parsedPreviousOperand * parsedCurrentOperand;
                this.reset();
                break;
            case "%":
                this.currentOperand.textContent = "" + parsedPreviousOperand % parsedCurrentOperand;
                this.reset();
                break;
        }
    };
    return Calculator;
}());
var calculator = new Calculator(previousOperandElement, currentOperandElement);
clearButton.addEventListener("click", function () { return calculator.clear(); });
equalButton.addEventListener("click", function () { return calculator.calculate(); });
buttons.addEventListener("click", function (e) {
    var target = e.target;
    var targetClass = target.classList;
    if (targetClass.contains("number")) {
        calculator.updateDisplay(target.textContent);
    }
    if (targetClass.contains("operation")) {
        if (calculator.operation)
            return;
        calculator.updateDisplay(target.textContent);
        calculator.setOperation(target.textContent);
    }
});
