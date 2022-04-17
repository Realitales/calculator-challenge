const numberContainer = document.querySelector("#number-container");
const numBtn = document.querySelectorAll("[data-value]");
const operationBtn = document.querySelectorAll("[data-operation]");
const equalBtn = document.querySelector("[data-equal]");
const resetBtn = document.querySelector("[data-reset]");
const delBtn = document.querySelector("[data-delete]");
const currentOperandElement = document.querySelector("[data-first-operand]");
const previousOperandElement = document.querySelector("[data-second-operand]");

const themeSETTER = document.querySelectorAll("[data-theme]");
const themeCircleState = document.querySelector(".circle-state");
const activeTheme = document.querySelector("[data-active]");
const body = document.querySelector("body");
const mainContent = document.querySelector("main");

let currentActiveTheme = 1;

themeSETTER.forEach(option => {

  option.addEventListener("click", () => {

    currentActiveTheme = option.dataset.theme;

    if (option.dataset.theme == 1) {

      themeCircleState.classList.add("active1");
      themeCircleState.classList.remove("active2");
      themeCircleState.classList.remove("active3");
      body.style.backgroundColor = "hsl(222, 26%, 31%)";
      mainContent.classList.add("theme1");
      mainContent.classList.remove("theme2");
      mainContent.classList.remove("theme3");

    }
    else if (option.dataset.theme == 2) {

      themeCircleState.classList.add("active2");
      themeCircleState.classList.remove("active1");
      themeCircleState.classList.remove("active3");
      body.style.backgroundColor = "hsl(0, 0%, 90%)";
      mainContent.classList.add("theme2");
      mainContent.classList.remove("theme1");
      mainContent.classList.remove("theme3");
    }
    else {
      themeCircleState.classList.add("active3");
      themeCircleState.classList.remove("active1");
      themeCircleState.classList.remove("active2");
      body.style.backgroundColor = "hsl(268, 75%, 9%)";
      mainContent.classList.add("theme3");
      mainContent.classList.remove("theme1");
      mainContent.classList.remove("theme2");
    }

  })
})


class Calculator {
  constructor(previousOperandElement, currentOperandElement) {
    this.previousOperandElement = previousOperandElement;
    this.currentOperandElement = currentOperandElement;
    this.currentOperand = "";
    this.previousOperand = "";
    this.operation = undefined;
    this.currentOperandLength = "";
    this.previousOperandLength = "";
  }

  clear() {
    this.currentOperand = "";
    this.previousOperand = "";
    this.operation = undefined;
  }

  chooseOperation(operation) {
    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = "";
  }

  appendNumber(number) {
    if (number === "." && this.currentOperand.includes(".")) return;
    this.currentOperand = this.currentOperand.toString() + number.toString();
  }

  updateDisplay() {
    this.currentOperandElement.value = this.currentOperand;
  }

  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
  }

  compute() {
    switch (this.operation) {
      case "addition":
        this.currentOperand =
          Number(this.currentOperand) + Number(this.previousOperand);
        break;

      case "subtraction":
        this.currentOperand =
          Number(this.previousOperand) - Number(this.currentOperand);
        break;

      case "multiply":
        this.currentOperand =
          Number(this.currentOperand) * Number(this.previousOperand);
        break;

      case "divide":
        this.currentOperand =
          Number(this.previousOperand) / Number(this.currentOperand);
        break;
    }
  }
}


const calculator = new Calculator(
  currentOperandElement,
  previousOperandElement
);

numBtn.forEach((num) => {
  num.addEventListener("click", () => {
    calculator.appendNumber(num.innerText);
    calculator.updateDisplay();
  });
});

operationBtn.forEach((operation) => {
  operation.addEventListener("click", () => {
    calculator.chooseOperation(operation.dataset.operation);
  });
});

equalBtn.addEventListener("click", () => {
  calculator.compute();
  calculator.updateDisplay();
});

resetBtn.addEventListener("click", () => {
  calculator.clear();
  calculator.updateDisplay();
});

delBtn.addEventListener("click", () => {
  calculator.delete();
  calculator.updateDisplay();
});
