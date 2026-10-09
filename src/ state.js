let expenses = [];

function addExpense({ description, amount, currency, category }) {
  if (!description || description.trim() === "") {
    return { success: false, error: "Description is required" };
  }

  const numAmount = Number(amount);
  if (isNaN(numAmount) || numAmount <= 0) {
    return { success: false, error: "Amount must be greater than 0" };
  }

  const newExpense = {
    id: crypto.randomUUID(),
    description: description.trim(),
    amount: numAmount,
    currency: currency || "USD",
    category: category || "General",
    createdAt: new Date().toISOString()
  };

  expenses = [...expenses, newExpense];

  return { success: true, data: newExpense, expenses };
}

function getExpenses() {
  return expenses;
}


console.log(addExpense({ description: "", amount: 10 })); 
console.log(addExpense({ description: "Lunch", amount: 0 }));
console.log(addExpense({ description: "Lunch", amount: 500, currency: "KES", category: "Food" })); 
console.log(expenses);