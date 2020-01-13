class Calculator{
    constructor(firstOperandElement, currentOperandElement){
        this.firstOperandElement = firstOperandElement;
        this.currentOperandElement = currentOperandElement;
        this.clear();
    }

    clear(){
        this.firstOperand = " ";
        this.currentOperand = " ";
        this.operation = undefined;
    }

    delete(){
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }

    appendNumber(number){
        if(number === "." && this.currentOperand.includes(".")){
            return;
        }
        this.currentOperand = this.currentOperand.toString() + number.toString(); //trebuie sa le transform in string, pt a le putea concatena
    }
    
    chooseOperation(operation){
        if (this.currentOperand === " ") return;
        if (this.firstOperand != " "){
            this.compute();
        }
        this.operation = operation;
        this.firstOperand = this.currentOperand;
        this.currentOperand =" ";
    }
    
    getDisplayNumber(number){
        const stringNumber = number.toString();
        const intigerDigits = parseFloat(stringNumber.split(".")[0]);
        const decimalDigits = stringNumber.split(".")[1];
        let intigerDisplay
        if(isNaN(intigerDigits)){
            intigerDisplay = ""; //pt a putea scrie .05
        }else{
            intigerDisplay = intigerDigits.toLocaleString("en", {maximumFractionDigits: 0}); //converteste  partea inainte de virgula
        }

        if(decimalDigits != null){
            return `${intigerDisplay}.${decimalDigits}`; //daca numarul are virgula, atunci le returneaza ca atare adica 1,222.01 de ex
        }else{
            return intigerDisplay; 
        }
    }

    updateDisplay(){
        this.currentOperandElement.innerText = this.getDisplayNumber(this.currentOperand);
        if(this.operation != null){
            this.firstOperandElement.innerText = `${this.getDisplayNumber(this.firstOperand)} ${this.operation}`;
        }else{
            this.firstOperandElement.innerText = " ";
        }
    }

    compute(){
        let result;
        const firstVal = parseFloat(this.firstOperand);
        const currentVal = parseFloat(this.currentOperand);
        if(isNaN(firstVal) || isNaN(currentVal)){
            return;
        }
        switch(this.operation){
            case "+":{
                result = firstVal + currentVal;
                break;
            }
            case "-":{
                result = firstVal - currentVal;
                break;
            }
            case "*":{
                result = firstVal * currentVal;
                break;
            }
            case "/":{
                result = firstVal / currentVal;
                break;
            }
        }
        
        this.currentOperand = result.toFixed(2);
        this.operation = undefined;
        this.firstOperand = " ";
        //de ce nu returneaza o eroare, avand in vedere ca let e block scoped?
    }
};

const numbersButton = document.querySelectorAll("[data-number]");
const operationsButton = document.querySelectorAll("[data-operation]");
const clearButton = document.querySelector("[data-clear]");
const deleteButton = document.querySelector("[data-delete]");
const equalsButton = document.querySelectorAll("[data-equals]");
const firstOperandElement = document.getElementsByClassName("second-operand")[0];
const currentOperandElement= document.getElementsByClassName("first-operand")[0];

const calculator = new Calculator(firstOperandElement, currentOperandElement);  //la first operand si secondOperand, le setez valoarea " ", altfel imi da eroare cand creez obiectul

numbersButton.forEach(button => button.addEventListener("click", () => {
    calculator.appendNumber(button.innerText); //observa cum fac legatura intre clasa si buton, fara a implica direct this-u
    calculator.updateDisplay();
}));

operationsButton.forEach(button => button.addEventListener("click", () =>{
    calculator.chooseOperation(button.innerText);
    calculator.updateDisplay();
}));

equalsButton.forEach(button => button.addEventListener("click", () =>{
    calculator.compute();
    calculator.updateDisplay();
}));

clearButton.addEventListener("click", () => {
    calculator.clear();
    calculator.updateDisplay();
});

deleteButton.addEventListener("click", () => {
    calculator.delete();
    calculator.updateDisplay();
});



