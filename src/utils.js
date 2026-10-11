export function formatAmount(amount, currency) {
    return `${amount.toFixed(2)} ${currency}`;
}

export function convertAmount(amount, from, to, rates) {
    if (from === to) {
        return amount;
    }

    const fromRate = rates[from];
    const toRate = rates[to];

    if (!fromRate || !toRate) {
        return null;
    }

    return (amount / fromRate) * toRate;
}

export function sumExpenses(expenses, homeCurrency, rates) {
    return expenses.reduce((sum, expense) => {
        const converted = convertAmount(expense.amount, expense.currency, homeCurrency, rates);
        return converted === null ? sum : sum + converted;
    }, 0);
}

export function filterByCategory(expenses, category) {
    if (!category) {
        return expenses;
    }
    return expenses.filter((expense) => expense.category === category);
}