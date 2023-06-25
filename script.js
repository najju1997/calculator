const input_div = document.getElementById('input');
const output_div = document.getElementById('output');
const clear_button = document.getElementById('clear');
const delete_button = document.getElementById('delete');
const number_button = document.querySelectorAll('.myButton');

//array used in calaculator
const inputField = {
  result: 0,
  previousInput: null,
  currentInput: null,
  previousNumber: null,
  previousOperator: null,
  currentOperator: null,
};

const oper = ['+', '-', '/', '*'];
const num = ['1','2','3','4','5','6','7','8','9','0','.'];
let pre = ""; //values that users enter
let screen = ""; //values that users see on the screen of calculator

// basic calculator functions
function addition(a, b) {
  return a + b;
}

function subtraction(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function division(a, b) {
  return a / b;
}

// return calculations results getting values from getValue() function
function operate(value) {
  const a = parseFloat(inputField.previousInput);
  const b = parseFloat(inputField.currentInput);
  const expression = inputField.currentOperator;
  let result = 0; // Variable to store the result

  if (value === '=') {
    switch (expression) {
      case '+':
        result = addition(a, b);
        break;
      case '-':
        result = subtraction(a, b);
        break;
      case '*':
        result = multiply(a, b);
        break;
      case '/':
        result = division(a, b);
        break;
    }
  }

  return result; // Return the result
}

// Clear button functionality
clear_button.addEventListener('click', () => {
  inputField.result = 0;
  inputField.previousInput = null;
  inputField.currentInput = null;
  inputField.previousNumber = null;
  inputField.previousOperator = null;
  inputField.currentOperator = null;
  pre = '';
  screen = '';
  input_div.textContent = screen;
  output_div.textContent = inputField.result;
});

// Delete button functionality
delete_button.addEventListener('click', () => {
  if (screen.length > 0 && pre.length >0) {
    screen = screen.slice(0, -1);
    pre = pre.slice(0, -1);
    input_div.textContent = screen;
    inputField.currentInput = pre;
  }
});

// main calculator function getting values
function getValue() {
  number_button.forEach((button) => {
    button.addEventListener('click', () => {
      // condition 1: buttons that are pressed are stored in 'pre' variable giving the first value i.e. a      
      if (num.includes(button.value)) {
        pre = pre + button.value;
        inputField.currentInput = pre;
        screen += button.value;
      // condition 2: this is created so that it ignores if the user presses + - buttons first instead of number.
      } else if (num.includes(button.value) && inputField.previousInput != null && inputField.currentOperator != null) {
          pre = pre + button.value;
          inputField.currentInput = pre;
          screen += button.value;
      //condition 3: when user press operator buttons, current input is shifted to previous input in inputField.
      // it gives us two values which will be used to calculate.
      } else if (oper.includes(button.value) && inputField.currentInput != null) {
          if (inputField.currentOperator) {
          // this is created so that operator is set and pressing operating buttons repeatedly will do nothing.
          return;
        }
        inputField.currentOperator = button.value;
        inputField.previousInput = inputField.currentInput;
        inputField.currentInput = null;
        pre = ''; // pre is cleared as pre had previously stored firstvalue.
        screen += button.value; // at the same time, all the buttons that are pressed are shown on the screen.

      // condition 4: when user press =, operate function is played passing first value and second value 
      // using operator that was pressed.
      
      }  else if (button.value === '=') {
        inputField.result = operate(button.value);
        output_div.textContent = inputField.result;
        // firstvalue is changed to result so the user can use result value to make further calculation
        inputField.currentInput = inputField.result; 
        pre=inputField.result;
        screen='';
        screen += inputField.result;
        inputField.previousInput = null;
        inputField.result = null;
        inputField.currentOperator = null;
      } 

      input_div.textContent = screen;
      console.log(inputField.currentInput);
      console.log(inputField.previousInput);
    });
  });
}

getValue();

