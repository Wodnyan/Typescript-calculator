const buttons:HTMLButtonElement = document.querySelector(".buttons");
const previousOperandElement:HTMLDivElement = document.querySelector(".display__top");
const currentOperandElement:HTMLDivElement = document.querySelector(".display__bottom");
const clearButton:HTMLButtonElement = document.querySelector(".clear-btn");
const equalButton:HTMLButtonElement = document.querySelector(".equal");

class Calculator{
    currentOperand:HTMLDivElement;
    previousOperand:HTMLDivElement;
    operation:string;
    constructor(previousOperand, currentOperand){
        this.currentOperand = currentOperand;
        this.previousOperand = previousOperand;
        this.operation;
    }
    clear():void{
        this.currentOperand.textContent = ""
        this.previousOperand.textContent = ""
        this.operation = null;
    }
    updateDisplay(str:string):void{
        if(this.currentOperand.textContent.indexOf(".") !== -1 && str === ".") return;
        this.currentOperand.textContent += str;
    }
    setOperation(operation:string):void{ 
        this.operation = operation;
        this.previousOperand.textContent = this.currentOperand.textContent;
        this.currentOperand.textContent = "";
    } 
    reset():void{ 
        this.previousOperand.textContent = ""; 
        this.operation = null; 
    }
    calculate():void{ 
        const parsedCurrentOperand = parseFloat(this.currentOperand.textContent) 
        const parsedPreviousOperand = parseFloat(this.previousOperand.textContent) 
        if(isNaN(parsedPreviousOperand) || isNaN(parsedCurrentOperand)) return this.clear()
        switch(this.operation){
            case "+":
                this.currentOperand.textContent = `${parsedPreviousOperand + parsedCurrentOperand}` 
                this.reset();
                break;
            case "-":
                this.currentOperand.textContent = `${parsedPreviousOperand - parsedCurrentOperand}` 
                this.reset();
                break;
            case "÷":
                this.currentOperand.textContent = `${parsedPreviousOperand / parsedCurrentOperand}` 
                this.reset();
                break;
            case "x":
                this.currentOperand.textContent = `${parsedPreviousOperand * parsedCurrentOperand}` 
                this.reset();
                break;
            case "%":
                this.currentOperand.textContent = `${parsedPreviousOperand % parsedCurrentOperand}` 
                this.reset();
                break;
        }
    }
}
const calculator = new Calculator(previousOperandElement, currentOperandElement);
clearButton.addEventListener("click", () => calculator.clear())
equalButton.addEventListener("click", () => calculator.calculate())
buttons.addEventListener("click", (e) => {
    const target = e.target as HTMLButtonElement;
    const targetClass = target.classList;
    if(targetClass.contains("number")){
        calculator.updateDisplay(target.textContent)
    }
    if(targetClass.contains("operation")){
        if(calculator.operation) return;
        calculator.updateDisplay(target.textContent)
        calculator.setOperation(target.textContent)
    }
})