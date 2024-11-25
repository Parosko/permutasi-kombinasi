let currentInput = 'n';
let n = 0;
let r = 0;
let tempValue = '';
let calcType = 'permutation'; // Default is permutation

function updateScreen() {
  document.getElementById('screen').innerText = `n = ${n}, r = ${r}`;
}

function appendDigit(digit) {
  tempValue += digit;
  document.getElementById('screen').innerText = tempValue;
}

function setInput(input) {
  if (tempValue === '') return;

  if (input === 'n') {
    n = parseInt(tempValue);
  } else if (input === 'r') {
    r = parseInt(tempValue);
  }
  tempValue = '';
  updateScreen();
}

function editInput(input) {
  if (input === 'n') {
    tempValue = n.toString();
  } else if (input === 'r') {
    tempValue = r.toString();
  }
  document.getElementById('screen').innerText = tempValue;
}

function clearScreen() {
  n = 0;
  r = 0;
  tempValue = '';
  updateScreen();
  document.getElementById('result').innerHTML = '';
}

function backspace() {
  tempValue = tempValue.slice(0, -1);
  document.getElementById('screen').innerText = tempValue || `n = ${n}, r = ${r}`;
}

function changeCalcType() {
  calcType = calcType === 'permutation' ? 'combination' : 'permutation';
  document.getElementById('calcType').innerText = calcType === 'permutation' ? 'Permutasi' : 'Kombinasi';
}

function factorial(num) {
  if (num < 0) return 0;
  let fact = 1;
  for (let i = 1; i <= num; i++) {
    fact *= i;
  }
  return fact;
}

function calculate() {
  if (n < 0 || r < 0 || r > n) {
    document.getElementById('result').innerHTML = "Masukkan nilai n dan r yang valid!";
    return;
  }

  let result = 0;
  let explanation = '';

  if (calcType === 'permutation') {
    result = factorial(n) / factorial(n - r);
    explanation = `P(${n}, ${r}) = ${factorial(n)} / ${factorial(n - r)} = ${result}`;
  } else if (calcType === 'combination') {
    result = factorial(n) / (factorial(r) * factorial(n - r));
    explanation = `C(${n}, ${r}) = ${factorial(n)} / (${factorial(r)} * ${factorial(n - r)}) = ${result}`;
  }

  document.getElementById('result').innerHTML = `Hasil: ${result}<br>${explanation}`;
}
