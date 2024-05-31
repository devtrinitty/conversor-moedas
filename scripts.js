const convertButton = document.querySelector(".convert-button");
const currencyFromSelect = document.querySelector("select[name='currency-from']");
const currencyToSelect = document.querySelector("select[name='currency-to']");
const currencyValueToConvert = document.querySelector(".currency-value-to-convert");
const currencyValueConverted = document.querySelector(".currency-value");

const fromFlagImg = document.querySelector(".currency-box.from img");
const toFlagImg = document.querySelector(".currency-box.to img");
const fromCurrencyText = document.querySelector(".currency-box.from .currency");
const toCurrencyText = document.querySelector(".currency-box.to .currency");

const currencyFlags = {
    "BRL": "assets/real.png",
    "USD": "assets/dolar.png",
    "EUR": "assets/euro.png",
    "GBP": "assets/libra.png"
};

const currencyNames = {
    "BRL": "Real Brasileiro",
    "USD": "Dólar Americano",
    "EUR": "Euro",
    "GBP": "Libra Esterlina"
};

const currencySymbols = {
    "BRL": "R$",
    "USD": "US$",
    "EUR": "€",
    "GBP": "£"
};

// Função para atualizar a bandeira e o texto conforme a seleção da moeda
function updateCurrencyDisplay(selectElement, flagImg, currencyText, currencyValue) {
    const currency = selectElement.value;
    flagImg.src = currencyFlags[currency];
    currencyText.innerHTML = currencyNames[currency];
    currencyValue.innerHTML = `${currencySymbols[currency]} 0,00`;
}

// Adiciona eventos de mudança nos selects
currencyFromSelect.addEventListener("change", () => updateCurrencyDisplay(currencyFromSelect, fromFlagImg, fromCurrencyText, currencyValueToConvert));
currencyToSelect.addEventListener("change", () => updateCurrencyDisplay(currencyToSelect, toFlagImg, toCurrencyText, currencyValueConverted));

convertButton.addEventListener("click", convertValues);

async function convertValues() {
    const inputCurrencyValue = parseFloat(document.querySelector(".input-currency").value.replace(/[^0-9.-]+/g, ""));
    const currencyFrom = currencyFromSelect.value;
    const currencyTo = currencyToSelect.value;

    // API para obter taxas de câmbio
    const apiUrl = `https://api.exchangerate-api.com/v4/latest/${currencyFrom}`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        const rate = data.rates[currencyTo];

        const convertedValue = inputCurrencyValue * rate;

        currencyValueToConvert.innerHTML = new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: currencyFrom
        }).format(inputCurrencyValue);

        currencyValueConverted.innerHTML = new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: currencyTo
        }).format(convertedValue);
    } catch (error) {
        console.error("Erro ao buscar as taxas de câmbio:", error);
    }
}

// Atualiza as bandeiras e textos iniciais
updateCurrencyDisplay(currencyFromSelect, fromFlagImg, fromCurrencyText, currencyValueToConvert);
updateCurrencyDisplay(currencyToSelect, toFlagImg, toCurrencyText, currencyValueConverted);
