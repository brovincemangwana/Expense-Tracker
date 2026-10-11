const listEl = document.getElementById("expense-list");
const emptyEl = document.getElementById("empty-message");
const totalEl = document.getElementById("total-expenses");
const totalCurrencyEl = document.getElementById("total-currency");
const statusEl = document.getElementById("status");

export function renderExpenses(expenses) {
    listEl.innerHTML = "";
    emptyEl.classList.toggle("hidden", expenses.length > 0);

    expenses.forEach((expense) => {
        const item = document.createElement("li");
        item.className = "expense-item";

        const info = document.createElement("div");
        info.className = "expense-info";

        const description = document.createElement("span");
        description.className = "expense-description";
        description.textContent = expense.description;

        const category = document.createElement("span");
        category.className = "expense-category";
        category.textContent = expense.category;

        info.append(description, category);

        const amount = document.createElement("span");
        amount.className = "expense-amount";
        amount.textContent = `${expense.amount.toFixed(2)} ${expense.currency}`;

        const deleteBtn = document.createElement("button");
        deleteBtn.className = "delete-btn";
        deleteBtn.type = "button";
        deleteBtn.dataset.id = expense.id;
        deleteBtn.textContent = "Delete";

        item.append(info, amount, deleteBtn);
        listEl.appendChild(item);
    });
}

export function renderTotal(total, currency) {
    totalEl.textContent = total.toFixed(2);
    totalCurrencyEl.textContent = currency;
}


export function populateCurrencies(codes, selected = "USD") {
    const selects = [
        document.getElementById("currency"),
        document.getElementById("home-currency-select"),
    ];

    selects.forEach((select) => {
        select.innerHTML = "";
        codes.forEach((code) => {
            const option = document.createElement("option");
            option.value = code;
            option.textContent = code;
            select.appendChild(option);
        });
        select.value = selected;
    });
}

export function showStatus(message) {
    statusEl.textContent = message;
}