const listEl = document.getElementById("expense-list");
const emptyEl = document.getElementById("empty-message");
const totalEl = document.getElementById("total-expenses");
const totalCurrencyEl = document.getElementById("total-currency");

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