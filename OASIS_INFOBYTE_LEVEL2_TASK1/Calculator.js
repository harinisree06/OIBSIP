const display = document.getElementById("display");
const buttons = document.querySelectorAll(".btn");
const clearButton = document.getElementById("clear");

let currentInput = "";
let previousInput = "";
let operator = null;

// Update the display
function updateDisplay(value) {
  display.textContent = value || "0";
}

// Clear the display
function clearDisplay() {
  currentInput = "";
  previousInput = "";
  operator = null;
  updateDisplay(currentInput);
}

// Perform the calculation
function calculate() {
  const current = parseFloat(currentInput);
  const previous = parseFloat(previousInput);

  if (isNaN(current) || isNaN(previous)) return;

  let result;
  switch (operator) {
    case "+":
      result = previous + current;
      break;
    case "-":
      result = previous - current;
      break;
    case "*":
      result = previous * current;
      break;
    case "/":
      result = previous / current;
      break;
    default:
      return;
  }

  currentInput = result.toString();
  operator = null;
  previousInput = "";
  updateDisplay(currentInput);
}

// Handle button click
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const value = button.getAttribute("data-value");

    if (value === "=") {
      calculate();
    } else if (["+", "-", "*", "/"].includes(value)) {
      if (currentInput) {
        if (previousInput) calculate();
        operator = value;
        previousInput = currentInput;
        currentInput = "";
      }
    } else if (value === ".") {
      if (!currentInput.includes(".")) currentInput += value;
    } else {
      currentInput += value;
    }

    updateDisplay(currentInput);
  });
});

// Handle clear button
clearButton.addEventListener("click", clearDisplay);
