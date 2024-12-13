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
  let steps = '';
  for (let i = 1; i <= num; i++) {
    fact *= i;
    steps += i + (i < num ? ' × ' : '');
  }
  return { value: fact, steps };
}


function calculate() {
  if (n < 0 || r < 0 || r > n) {
    document.getElementById('result').innerHTML = "Masukkan nilai n dan r yang valid!";
    return;
  }

  let result = 0;
  let explanation = '';

  if (calcType === 'permutation') {
    let nFact = factorial(n);
    let nMinusRFact = factorial(n - r);

    result = nFact.value / nMinusRFact.value;

    // Step 1: Hitung n!
    explanation = `<p>1. Hitunglah n!: n = ${n}: ${n}! = ${nFact.steps} = ${nFact.value}</p>`;

    // Step 2: Hitung (n - r)!
    explanation += `<p>2. Hitunglah (n - r)!: (${n} - ${r})! = ${n - r}! = ${nMinusRFact.steps} = ${nMinusRFact.value}</p>`;

    // Step 3: Gunakan rumus P(n, r)
    explanation += `<div style="display:flex; align-items:center;"><p>3. Gunakan rumus P(n, r) =</p>  ${fractionDisplay('n!', '(n - r)!')}</div>`;

    explanation += `<div style="display:flex; align-items:center;"> <p>P(${n}, ${r}) = </p> ${fractionDisplay(nFact.value, nMinusRFact.value)} = ${result}</div>`;

    explanation += `<p><strong>Hasil Permutasi: ${result}</strong></p>`;
  
  } else if (calcType === 'combination') {
    let nFact = factorial(n);
    let rFact = factorial(r);
    let nMinusRFact = factorial(n - r);

    result = nFact.value / (rFact.value * nMinusRFact.value);
 
    // Step 1: Hitung n!
    explanation = `<p>1. Hitunglah n!: n = ${n}: ${n}! = ${nFact.steps} = ${nFact.value}</p>`;

    // Step 2: Hitung r!
    explanation += `<p>2. Hitunglah r!: r = ${r}: ${r}! = ${rFact.steps} = ${rFact.value}</p>`;

    // Step 3: Hitung (n - r)!
    explanation += `<p>3. Hitunglah (n - r)!: (${n} - ${r})! = ${n - r}! = ${nMinusRFact.steps} = ${nMinusRFact.value}</p>`;

    // Step 4: Gunakan rumus C(n, r)
    explanation += `<div style="display:flex; align items:center;"><p>4. Gunakan rumus C(n, r) =</p> ${fractionDisplay('n!', 'r!(n - r)!')}</div>`;
    explanation += `<div style="display:flex; align items:center;"><p>C(${n}, ${r}) = </p> ${fractionDisplay(nFact.value, rFact.value + ' × ' + nMinusRFact.value)} <p> = ${result}</p> </div>`;

    explanation += `<p><strong>Hasil Kombinasi: ${result}</strong></p>`;
  }

  document.getElementById('result').innerHTML = explanation;
}

// Function to display fractions correctly (numerator over denominator)
function fractionDisplay(numerator, denominator) {
  return `<div style="display: inline-block; text-align: center;  margin-left:3px;">
            <div>${numerator}</div>
            <hr style="margin: 0;">
            <div>${denominator}</div>
          </div>`;
}

function factorial(num) {
  if (num < 0) return { value: 0, steps: '' };
  let fact = 1;
  let steps = '';
  for (let i = 1; i <= num; i++) {
    fact *= i;
    steps += i + (i < num ? ' × ' : '');
  }
  return { value: fact, steps };
}

// Function to toggle visibility of User Guide
function toggleGuide() {
  const guide = document.getElementById('userGuide');
  guide.classList.toggle('show'); // Toggle the 'show' class to slide it in and out
}

