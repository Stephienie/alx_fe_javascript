// =======================
// INITIAL DATA & STORAGE
// =======================

// Load quotes from localStorage or use defaults
let quotes = JSON.parse(localStorage.getItem("quotes")) || [
  { text: "Success is not final, failure is not fatal.", category: "Motivation" },
  { text: "Talk is cheap. Show me the code.", category: "Programming" },
  { text: "The future depends on what you do today.", category: "Inspiration" }
];

// DOM references
const quoteDisplay = document.getElementById("quoteDisplay");
const newQuoteBtn = document.getElementById("newQuote");
const exportBtn = document.getElementById("exportQuotes");

// Create category selector dynamically
const categorySelect = document.createElement("select");
document.body.insertBefore(categorySelect, newQuoteBtn);

// =======================
// LOCAL STORAGE FUNCTIONS
// =======================

function saveQuotes() {
  localStorage.setItem("quotes", JSON.stringify(quotes));
}

// =======================
// CATEGORY HANDLING
// =======================

function updateCategories() {
  categorySelect.innerHTML = "";

  const categories = [...new Set(quotes.map(q => q.category))];

  categories.forEach(category => {
    const option = document.createElement("option");
    option.value = category;
    option.textContent = category;
    categorySelect.appendChild(option);
  });
}

// =======================
// QUOTE DISPLAY
// =======================

function showRandomQuote() {
  const selectedCategory = categorySelect.value;
  const filteredQuotes = quotes.filter(q => q.category === selectedCategory);

  if (filteredQuotes.length === 0) {
    quoteDisplay.innerHTML = "No quotes available.";
    return;
  }

  const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
  const quoteText = filteredQuotes[randomIndex].text;

  quoteDisplay.innerHTML = quoteText;

  // Store last viewed quote (Session Storage)
  sessionStorage.setItem("lastQuote", quoteText);
}

// =======================
// ADD QUOTE FORM (REQUIRED)
// =======================

function createAddQuoteForm() {
  const formDiv = document.createElement("div");

  const quoteInput = document.createElement("input");
  quoteInput.id = "newQuoteText";
  quoteInput.placeholder = "Enter a new quote";

  const categoryInput = document.createElement("input");
  categoryInput.id = "newQuoteCategory";
  categoryInput.placeholder = "Enter quote category";

  const addBtn = document.createElement("button");
  addBtn.textContent = "Add Quote";

  addBtn.addEventListener("click", addQuote);

  formDiv.appendChild(quoteInput);
  formDiv.appendChild(categoryInput);
  formDiv.appendChild(addBtn);

  document.body.appendChild(formDiv);
}

// =======================
// ADD NEW QUOTE
// =======================

function addQuote() {
  const text = document.getElementById("newQuoteText").value.trim();
  const category = document.getElementById("newQuoteCategory").value.trim();

  if (text === "" || category === "") {
    alert("Please enter both quote and category.");
    return;
  }

  quotes.push({ text, category });
  saveQuotes();
  updateCategories();
  showRandomQuote();
}

// =======================
// JSON EXPORT
// =======================

function exportQuotesToJson() {
  const jsonData = JSON.stringify(quotes, null, 2);
  const blob = new Blob([jsonData], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = "quotes.json";
  link.click();

  URL.revokeObjectURL(url);
}

// =======================
// JSON IMPORT (REQUIRED)
// =======================

function importFromJsonFile(event) {
  const fileReader = new FileReader();

  fileReader.onload = function (event) {
    const importedQuotes = JSON.parse(event.target.result);
    quotes.push(...importedQuotes);
    saveQuotes();
    updateCategories();
    alert("Quotes imported successfully!");
  };

  fileReader.readAsText(event.target.files[0]);
}

// =======================
// EVENT LISTENERS
// =======================

newQuoteBtn.addEventListener("click", showRandomQuote);
exportBtn.addEventListener("click", exportQuotesToJson);

// =======================
// INITIAL LOAD
// =======================

updateCategories();
createAddQuoteForm();

// Restore last session quote if available
const lastQuote = sessionStorage.getItem("lastQuote");
if (lastQuote) {
  quoteDisplay.innerHTML = lastQuote;
} else {
  showRandomQuote();
}
