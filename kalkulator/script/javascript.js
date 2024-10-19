// javascript calculator

let outputUpper = document.querySelector('#upper');
let outputLower = document.querySelector('#lower');

// function to get number input
function pressNum(e) {
  if (outputLower.innerHTML === '0') {
    outputLower.innerHTML = e.innerHTML;
  } else {
    outputLower.innerHTML += e.innerHTML;
  }
  adjustFontSize();
}

// function to adjust the font size of outputLower based on the number of characters
function adjustFontSize() {
  const length = outputLower.innerHTML.length;
  if (length <= 10) {
    outputLower.style.fontSize = '25px';
  } else if (length <= 15) {
    outputLower.style.fontSize = '20px';
  } else if (length <= 20) {
    outputLower.style.fontSize = '15px';
  } else {
    outputLower.style.fontSize = '10px';
  }
}

// clear all
function pressAllClear() {
  outputUpper.innerHTML = '';
  outputLower.innerHTML = '0';
  adjustFontSize();
}

// clear one
function pressClear() {
  outputLower.innerHTML = outputLower.innerHTML.slice(0, -1);
  if (outputLower.innerHTML === '') {
    outputLower.innerHTML = '0';
  }
  adjustFontSize();
}

// function to calculate percentage
function pressPercentage() {
  let currentValue = parseFloat(outputLower.innerHTML);
  if (!isNaN(currentValue)) {
    outputLower.innerHTML = (currentValue / 100).toString();
  } else {
    outputLower.innerHTML = "Error";
  }
  adjustFontSize();
}

// calculate button
function pressEqual() {
  let exp = outputLower.innerHTML;
  outputUpper.innerHTML = exp;
  
  // Handle implicit multiplication
  exp = exp.replace(/\)\(/g, ')×(');
  exp = exp.replace(/(\d)\(/g, '$1×(');
  exp = exp.replace(/\)(\d)/g, ')×$1');
  
  exp = exp.replace(/×/g, '*').replace(/÷/g, '/');
  exp = exp.replace(/sin/g, 'Math.sin');
  exp = exp.replace(/cos/g, 'Math.cos');
  exp = exp.replace(/tan/g, 'Math.tan');
  exp = exp.replace(/log/g, 'Math.log10');
  exp = exp.replace(/ln/g, 'Math.log');
  exp = exp.replace(/sqrt/g, 'Math.sqrt');
  
  // Handle implicit multiplication between trigonometric functions and numbers
  exp = exp.replace(/(Math\.\w+)\s+(\d+)/g, '$1($2)');
  exp = exp.replace(/(\d+)(Math\.\w+)/g, '$1*$2');

  let result;
  try {
    result = eval(exp);
    if (result.toString().indexOf('.') !== -1) {
      result = result.toFixed(4);
    }
  } catch (e) {
    result = 'Error';
  }
  outputLower.innerHTML = result;
  adjustFontSize();

  // Add result to history
  let historyList = document.getElementById("historyList");
  let listItem = document.createElement("li");
  listItem.textContent = `${exp} = ${result}`;
  historyList.appendChild(listItem);
}

// function to handle operator input
function pressOperator(e) {
  let lastChar = outputLower.innerHTML.slice(-1);
  if (['+', '-', '×', '÷'].includes(lastChar)) {
    outputLower.innerHTML = outputLower.innerHTML.slice(0, -1) + e.innerHTML;
  } else {
    outputLower.innerHTML += e.innerHTML;
  }
  adjustFontSize();
}

// function to handle square
function pressSquare() {
  let current = parseFloat(outputLower.innerHTML);
  outputLower.innerHTML = (!isNaN(current)) ? (current ** 2).toString() : "Error";
  adjustFontSize();
}

// function to handle square root
function pressSquareRoot() {
  if (outputLower.innerHTML === '0') {
    outputLower.innerHTML = 'sqrt ';
  } else {
    outputLower.innerHTML += ' sqrt ';
  }
  adjustFontSize();
}

// function to handle trigonometric and log functions
function pressFunction(func) {
  if (outputLower.innerHTML === '0') {
    outputLower.innerHTML = `${func} `;
  } else {
    outputLower.innerHTML += `${func} `;
  }
  adjustFontSize();
}

// function to handle dot input
function pressDot() {
  if (!outputLower.innerHTML.includes('.')) {
    outputLower.innerHTML += '.';
  }
  adjustFontSize();
}

// function to handle bracket input
function pressBracket(e) {
  if (outputLower.innerHTML === '0') {
    outputLower.innerHTML = e.innerHTML;
  } else {
    outputLower.innerHTML += e.innerHTML;
  }
  adjustFontSize();
}

// attach keyboard event
document.addEventListener('keydown', function (e) {
  switch (e.key) {
    case '0':
    case '1':
    case '2':
    case '3':
    case '4':
    case '5':
    case '6':
    case '7':
    case '8':
    case '9':
      pressNum(document.querySelector(`button:contains('${e.key}')`));
      break;
    case '+':
    case '-':
    case '*':
    case '/':
      pressOperator({ innerHTML: e.key });
      break;
    case '.':
      pressDot();
      break;
    case '(':
    case ')':
      pressBracket({ innerHTML: e.key });
      break;
    case 'Enter':
      e.preventDefault();
      pressEqual();
      break;
    case 'Backspace':
      pressClear();
      break;
    case 'Escape':
      pressAllClear();
      break;
    case '^':
      pressSquare();
      break;
    case 'r':
      pressSquareRoot();
      break;
    case 's':
      pressFunction('sin');
      break;
    case 'c':
      pressFunction('cos');
      break;
    case 't':
      pressFunction('tan');
      break;
    case 'l':
      pressFunction('log');
      break;
    case 'n':
      pressFunction('ln');
      break;
  }
  adjustFontSize();
});