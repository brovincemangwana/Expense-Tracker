import {
    getExpenses,
    addExpense,
    deleteExpense,
    getHomeCurrency,
    setHomeCurrency,
} from "./state.js";
import { renderExpenses, renderTotal, populateCurrencies, showStatus } from "./ui.js";
import { fetchRates } from "./api.js";
import { sumExpenses, filterByCategory } from "./utils.js";

const FALLBACK_CURRENCIES = ["USD", "EUR", "GBP", "KES"];

const form = document.getElementById("expense-form");
const list = document.getElementById("expense-list");
const filterSelect = document.getElementById("filter-category");
const homeSelect = document.getElementById("home-currency-select");
const currencySelect = document.getElementById("currency");

let rates = {};

function refresh() {
    const expenses = filterByCategory(getExpenses(), filterSelect.value);
    const total = sumExpenses(expenses, getHomeCurrency(), rates);
    renderExpenses(expenses);
    renderTotal(total, getHomeCurrency());
}

form.addEventListener("submit", (event) => {
    event.preventDefault();

    const data = new FormData(form);
    const amount = parseFloat(data.get("amount"));

    if (Number.isNaN(amount) || amount <= 0) {
        showStatus("Enter an amount greater than 0.");
        return;
    }

    addExpense({
        id: Date.now().toString(),
        description: data.get("description").trim(),
        amount,
        currency: data.get("currency"),
        category: data.get("category"),
    });

    form.reset();
    currencySelect.value = getHomeCurrency();
    showStatus("Expense added.");
    refresh();
});

list.addEventListener("click", (event) => {
    const button = event.target.closest(".delete-btn");
    if (!button) {
        return;
    }
    deleteExpense(button.dataset.id);
    showStatus("Expense deleted.");
    refresh();
});

filterSelect.addEventListener("change", refresh);

homeSelect.addEventListener("change", () => {
    setHomeCurrency(homeSelect.value);
    showStatus(`Home currency set to ${homeSelect.value}.`);
    refresh();
});

async function init() {
    let codes = FALLBACK_CURRENCIES;

    try {
        rates = await fetchRates("USD");
        codes = Object.keys(rates);
    } catch (error) {
        showStatus("Could not load exchange rates. Totals only include the home currency.");
    }

    populateCurrencies(codes, getHomeCurrency());
    refresh();
}

init();