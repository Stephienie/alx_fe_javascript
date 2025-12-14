// Quotes array
const quotes = [
  { text: "Learning never exhausts the mind.", category: "Education" },
  { text: "Code is poetry.", category: "Programming" },
  { text: "Success is not final.", category: "Motivation" }
];

// DOM Elements
const quoteDisplay = document.getElementById("quoteDisplay");
const newQuoteBtn = document.getElementById("newQuote");
const addQuoteBtn = document.getElementById("addQuoteBtn");
const newQuoteText = document.getElementById("newQuoteText");
const newQuoteCategory = document.getElementById("newQuoteCategory");

/**
 * Function: displayRandomQuote
 * Selects a random quote and updates the DOM
 */
function displayRandomQuote() {
  if (quotes.length === 0) {
    quoteDisplay.textContent = "No quotes available.";
    return;
  }
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const quote = quotes[randomIndex];
  quoteDisplay.textContent = `"${quote.text}" — ${quote.category}`;
}

/**
 * Function: addQuote
 * Adds a new quote to the quotes array and updates the DOM
 */
function addQuote() {
  const text = newQuoteText.value.trim();
  const category = newQuoteCategory.value.trim();

  if (!text || !category) {
    alert("Please fill both fields.");
    return;
  }

  quotes.push({ text, category });

  // Clear inputs
  newQuoteText.value = "";
  newQuoteCategory.value = "";

  // Update DOM
  displayRandomQuote();
}

// Event listeners
newQuoteBtn.addEventListener("click", displayRandomQuote);
addQuoteBtn.addEventListener("click", addQuote);

// Initialize with a random quote on page load
displayRandomQuote();
