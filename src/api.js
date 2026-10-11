const RATES_URL = "https://open.er-api.com/v6/latest/";

export async function fetchRates(base = "USD") {
    const response = await fetch(`${RATES_URL}${base}`);

    if (!response.ok) {
        throw new Error(`Failed to fetch rates (${response.status})`);
    }

    const data = await response.json();

    if (data.result !== "success") {
        throw new Error("Rates API returned an error");
    }

    return data.rates;
}

export async function fetchCurrencyCodes(base = "USD") {
    const rates = await fetchRates(base);
    return Object.keys(rates);
}