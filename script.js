const amountInput = document.getElementById('amount');
const fromCurrency = document.getElementById('from');
const toCurrency = document.getElementById('to');
const result = document.getElementById('result');
const convertBtn = document.getElementById('convertBtn');

// Fetch currency list
async function loadCurrencies() {
  const res = await fetch('https://api.frankfurter.app/currencies');
  const data = await res.json();

  for (const [code, name] of Object.entries(data)) {
    const option1 = document.createElement('option');
    const option2 = document.createElement('option');
    option1.value = option2.value = code;
    option1.textContent = option2.textContent = `${code} - ${name}`;
    fromCurrency.appendChild(option1);
    toCurrency.appendChild(option2);
  }

  fromCurrency.value = 'USD';
  toCurrency.value = 'EUR';
}

loadCurrencies();

// Convert
convertBtn.addEventListener('click', async () => {
  const amount = parseFloat(amountInput.value);
  const from = fromCurrency.value;
  const to = toCurrency.value;

  if (isNaN(amount)) {
    result.textContent = "Please enter a valid number.";
    return;
  }

  if (from === to) {
    result.textContent = "Choose two different currencies.";
    return;
  }

  const res = await fetch(`https://api.frankfurter.app/latest?amount=${amount}&from=${from}&to=${to}`);
  const data = await res.json();

  const converted = data.rates[to];
  result.textContent = `${amount} ${from} = ${converted.toFixed(2)} ${to}`;
});
