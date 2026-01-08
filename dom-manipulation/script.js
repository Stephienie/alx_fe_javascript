// Quote data
const quotes = [
  { text: "Success is not final, failure is not fatal.", category: "Motivation" },
  { text: "Talk is cheap. Show me the code.", category: "Programming" },
  { text: "The future depends on what you do today.", category: "Inspiration" }
];

// DOM references
const quoteDisplay = document.getElementById("quoteDisplay");
const newQuoteBtn = document.getElementById("newQuote");

// Create category selector dynamically
const categorySelect = document.createElement("select");
document.body.insertBefore(categorySelect, newQuoteBtn);

// Populate categories
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

// Show a random quote
function showRandomQuote() {
  const selectedCategory = categorySelect.value;
  const filteredQuotes = quotes.filter(q => q.category === selectedCategory);

  if (filteredQuotes.length === 0) {
    quoteDisplay.innerHTML = "No quotes available.";
    return;
  }

  const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
  quoteDisplay.innerHTML = filteredQuotes[randomIndex].text;
}

// ✅ REQUIRED FUNCTION
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

// Add a new quote
function addQuote() {
  const text = document.getElementById("newQuoteText").value.trim();
  const category = document.getElementById("newQuoteCategory").value.trim();

  if (text === "" || category === "") {
    alert("Please enter both quote and category.");
    return;
  }

  quotes.push({ text, category });

  updateCategories();
  showRandomQuote();
}

// Event listener
newQuoteBtn.addEventListener("click", showRandomQuote);

// Initial setup
updateCategories();
createAddQuoteForm();
showRandomQuote();
