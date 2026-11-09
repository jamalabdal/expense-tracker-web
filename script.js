// Expense Tracker - plain JavaScript, data saved in the browser's localStorage.

const STORAGE_KEY = "expenses";
let expenses = loadExpenses();

// --- Page elements ---
const form = document.getElementById("expense-form");
const descriptionInput = document.getElementById("description");
const amountInput = document.getElementById("amount");
const categoryInput = document.getElementById("category");
const filterSelect = document.getElementById("filter");
const listEl = document.getElementById("list");
const chartEl = document.getElementById("chart");
const totalEl = document.getElementById("total");
const countEl = document.getElementById("count");

// --- Storage ---
function loadExpenses() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch {
    return []; // corrupted data: start fresh
  }
}

function saveExpenses() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(expenses));
}

// --- Helpers ---
const money = (n) => "$" + n.toFixed(2);

// --- Actions ---
form.addEventListener("submit", (event) => {
  event.preventDefault();
  expenses.unshift({
    id: Date.now(),
    description: descriptionInput.value.trim(),
    amount: parseFloat(amountInput.value),
    category: categoryInput.value,
    date: new Date().toLocaleDateString(),
  });
  saveExpenses();
  form.reset();
  render();
});

filterSelect.addEventListener("change", render);

function deleteExpense(id) {
  expenses = expenses.filter((e) => e.id !== id);
  saveExpenses();
  render();
}

// --- Rendering ---
function render() {
  const filter = filterSelect.value;
  const visible = filter === "All" ? expenses : expenses.filter((e) => e.category === filter);

  // Summary cards (always show overall numbers)
  totalEl.textContent = money(expenses.reduce((sum, e) => sum + e.amount, 0));
  countEl.textContent = expenses.length;

  renderList(visible);
  renderChart();
}

function renderList(items) {
  listEl.innerHTML = "";
  if (items.length === 0) {
    const empty = document.createElement("li");
    empty.className = "empty";
    empty.textContent = "No expenses yet.";
    listEl.appendChild(empty);
    return;
  }
  for (const item of items) {
    const li = document.createElement("li");

    const info = document.createElement("div");
    info.className = "info";
    info.textContent = item.description; // textContent prevents HTML injection
    const meta = document.createElement("small");
    meta.textContent = item.category + " \u2022 " + item.date;
    info.appendChild(meta);

    const amount = document.createElement("span");
    amount.className = "amount";
    amount.textContent = money(item.amount);

    const del = document.createElement("button");
    del.className = "delete";
    del.textContent = "\u00d7";
    del.title = "Delete";
    del.addEventListener("click", () => deleteExpense(item.id));

    li.append(info, amount, del);
    listEl.appendChild(li);
  }
}

function renderChart() {
  const totals = {};
  for (const e of expenses) totals[e.category] = (totals[e.category] || 0) + e.amount;
  const max = Math.max(0, ...Object.values(totals));

  chartEl.innerHTML = "";
  for (const [category, total] of Object.entries(totals)) {
    const row = document.createElement("div");
    row.className = "bar-row";
    row.innerHTML = '<span class="bar-label"></span><div class="bar-track"><div class="bar-fill"></div></div><span class="bar-value"></span>';
    row.querySelector(".bar-label").textContent = category;
    row.querySelector(".bar-fill").style.width = (total / max) * 100 + "%";
    row.querySelector(".bar-value").textContent = money(total);
    chartEl.appendChild(row);
  }
}

render();
