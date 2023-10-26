const result = document.getElementById('result');
const buttonsWrapper = document.querySelector('.wrapper');

const calculator = {
  firstNumber: '',
  secondNumber: '',
  current: null,
  operator: null,
};

let operatorIsClicked = false;
let equalsIsClicked = false;

buttonsWrapper.addEventListener('click', ev => {
  if (ev.target.nodeName !== 'BUTTON') {
    return;
  }

  const { target } = ev;

  const actions = {
    equals: calculate,
    clears: clearResult,
  };

  actions[target.value] ? actions[target.value]() : generateCalc(target);
});

const generateCalc = target => {
  calculator.current = target.value;
  const { current } = calculator;

  if (!isNaN(current)) {
    if (equalsIsClicked && !operatorIsClicked) {
      calculator.firstNumber = '';
    }
    if (operatorIsClicked) {
      calculator.secondNumber += current;
      updateResult(calculator.secondNumber);
    } else {
      equalsIsClicked = false;
      calculator.firstNumber += current;
      updateResult(calculator.firstNumber);
    }
  } else {
    operatorIsClicked = true;
    calculator.operator = current;
  }
};

const calculate = () => {
  const { firstNumber, secondNumber, operator } = calculator;
  let currentResult;

  if (!firstNumber || !secondNumber || !operator) {
    return;
  }
  switch (operator) {
    case '*':
      currentResult = +firstNumber * +secondNumber;
      break;
    case '/':
      currentResult = +firstNumber / +secondNumber;
      break;
    case '-':
      currentResult = +firstNumber - +secondNumber;
      break;
    case '+':
      currentResult = +firstNumber + +secondNumber;
      break;
  }

  calculator.firstNumber = currentResult;
  calculator.secondNumber = '';
  calculator.operator = null;
  equalsIsClicked = true;
  operatorIsClicked = false;
  return (result.value = currentResult == undefined ? '' : currentResult);
};

const clearResult = () => {
  calculator.firstNumber = '';
  calculator.secondNumber = '';
  calculator.current = null;
  calculator.operator = null;
  operatorIsClicked = false;
  equalsIsClicked = false;
  result.value = '';
};

const updateResult = value => {
  result.value = value;
};
