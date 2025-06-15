//elements
const input = document.querySelector(".screen-calc");
const numbers = document.querySelectorAll(".btn-calc div");
const operators = document.querySelectorAll(".btn-calc-op div");
const result = document.getElementById("calc-equals");
const clearBtn = document.getElementById("calc-clear");
const backBtn = document.getElementById("calc-back");

let firstNum = "";
let secondNum = "";
let currentOp = "";
let resultDisplayed = false;

//operate function( add, subtract, multiply, divide)
function operate(a, op, b) {
  a = parseFloat(a);
  b = parseFloat(b);
  switch (op) {
    case "+":
      return a + b;
    case "-":
      return a - b;
    case "×":
      return a * b;
    case "÷":
      return b === 0 ? "Nope" : a / b;
  }
}

//update the display
function updateDisplay() {
  input.textContent =
    (firstNum || "") +
    (currentOp ? " " + currentOp + " " : "") +
    (secondNum || "");
  if (!input.textContent) input.textContent = "0";
}

// Handle number & decimal input
function appendNumber(num) {
  if (resultDisplayed) {
    firstNum = "";
    secondNum = "";
    currentOp = "";
    resultDisplayed = false;
  }

  if (!currentOp) {
    if (num === "." && firstNum.includes(".")) return;

    if (num !== "." && firstNum === "0") {
      firstNum = num; // replace leading zero with the new number
    } else {
      firstNum += num;
    }
  } else {
    if (num === "." && secondNum.includes(".")) return;

    if (num !== "." && secondNum === "0") {
      secondNum = num; // replace leading zero with the new number
    } else {
      secondNum += num;
    }
  }
  updateDisplay();
}

// Number button clicks
numbers.forEach((btn) => {
  btn.addEventListener("click", () => {
    appendNumber(btn.textContent);
  });
});

// Operator button clicks
operators.forEach((btn) => {
  btn.addEventListener("click", () => {
    if (firstNum === "") return;
    if (secondNum !== "") return; // prevent multiple operators
    currentOp = btn.textContent;
    updateDisplay();
  });
});

// Result calculation
result.addEventListener("click", () => {
  if (firstNum === "" || currentOp === "" || secondNum === "") return;

  let calcResult = operate(firstNum, currentOp, secondNum);
  if (typeof calcResult === "number")
    calcResult = Math.round(calcResult * 1000) / 1000;

  input.textContent = calcResult;
  firstNum = calcResult === "Error" ? "" : calcResult.toString();
  secondNum = "";
  currentOp = "";
  resultDisplayed = true;
});

// Clear button
clearBtn.addEventListener("click", () => {
  firstNum = "";
  secondNum = "";
  currentOp = "";
  input.textContent = "0";
  resultDisplayed = false;
});

// Backspace button
backBtn.addEventListener("click", () => {
  if (resultDisplayed) return;

  if (!currentOp) {
    firstNum = firstNum.slice(0, -1);
  } else if (secondNum) {
    secondNum = secondNum.slice(0, -1);
  }
  updateDisplay();
});

// Keyboard support
window.addEventListener("keydown", (e) => {
  if (e.key >= "0" && e.key <= "9") appendNumber(e.key);
  if (e.key === ".") appendNumber(".");
  if (e.key === "+" || e.key === "-") {
    if (firstNum !== "" && secondNum === "") {
      currentOp = e.key;
      updateDisplay();
    }
  }
  if (e.key === "*" || e.key === "x") {
    if (firstNum !== "" && secondNum === "") {
      currentOp = "×";
      updateDisplay();
    }
  }
  if (e.key === "/") {
    if (firstNum !== "" && secondNum === "") {
      currentOp = "÷";
      updateDisplay();
    }
  }
  if (e.key === "Enter" || e.key === "=") {
    result.click();
  }
  if (e.key === "Backspace") {
    backBtn.click();
  }
  if (e.key === "Delete") {
    clearBtn.click();
  }
});
