let expenses = [];
let homeCurrency = "USD";

export function getExpenses() {
    return [...expenses];
}

export function addExpense(expense) {
    expenses.push(expense);
}

export function deleteExpense(id) {
    expenses = expenses.filter((expense) => expense.id !== id);
}

export function getHomeCurrency() {
    return homeCurrency;
}

export function setHomeCurrency(code) {
    homeCurrency = code;
}