// =======================
// LOAD QUOTES FROM STORAGE
// =======================

let quotes = JSON.parse(localStorage.getItem("quotes")) || [
  { text: "Success is not final, failure is not fatal.", category: "Motivation" },
  { text: "Talk is cheap. Show me the code.", category: "Programming" },
  { text: "The future depends on what you do today.", category: "Inspiration" }
];

// DOM references
const quoteDisplay = document.getElementById("quoteDisplay");
const newQuoteBtn = document.getElementById("newQuote");
const categoryFilter = document.getElementById("categoryFilter");

// =======================
// STORAGE HELPERS
// =======================

function saveQuotes() {
  localStorage.setItem("quotes", JSON.stringify(quotes));
}

// =======================
// CATEGORY POPULATION
// =======================

// ✅ REQUIRED FUNCTION
function populateCategories() {
  categoryFilter.innerHTML = `<option value="all">All Categories</option>`;

  const categories = [...new Set(quotes.map(q => q.category))];

  categories.forEach(category => {
    const option = document.createElement("option");
    option.value = category;
    option.textContent = category;
    categoryFilter.appendChild(option);
  });

  // Restore saved filter
  const savedFilter = localStorage.getItem("selectedCategory");
  if (savedFilter) {
    categoryFilter.value = savedFilter;
  }
}

// =======================
// FILTERING LOGIC
// =======================

// ✅ REQUIRED FUNCTION
function filterQuotes() {
  const selectedCategory = categoryFilter.value;

  // Save selected filter
  localStorage.setItem("selectedCategory", selectedCategory);

  let filteredQuotes = quotes;

  if (selectedCategory !== "all") {
    filteredQuotes = quotes.filter(q => q.category === selectedCategory);
  }

  if (filteredQuotes.length === 0) {
    quoteDisplay.innerHTML = "No quotes available for this category.";
    return;
  }

  const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
  quoteDisplay.innerHTML = filteredQuotes[randomIndex].text;
}

// =======================
// ADD QUOTE FORM
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

  // Update categories immediately
  populateCategories();
  filterQuotes();
}

// =======================
// EVENT LISTENERS
// =======================

newQuoteBtn.addEventListener("click", filterQuotes);

// =======================
// INITIAL LOAD
// =======================

populateCategories();
createAddQuoteForm();
filterQuotes();

const syncNotice = document.createElement("div");
syncNotice.id = "syncNotice";
document.body.prepend(syncNotice);

const SERVER_URL = "https://jsonplaceholder.typicode.com/posts";

async function fetchQuotesFromServer() {
  try {
    const response = await fetch(SERVER_URL);
    const data = await response.json();

    // Simulate server-side quotes
    return data.slice(0, 5).map(item => ({
      text: item.title,
      category: "Server"
    }));
  } catch (error) {
    console.error("Error fetching server quotes:", error);
    return [];
  }
}

async function syncWithServer() {
  const serverQuotes = await fetchQuotesFromServer();

  if (serverQuotes.length === 0) return;

  const localData = JSON.stringify(quotes);
  const serverData = JSON.stringify(serverQuotes);

  // Conflict detected → server takes precedence
  if (localData !== serverData) {
    quotes = serverQuotes;
    localStorage.setItem("quotes", JSON.stringify(quotes));

    populateCategories();
    filterQuotes();

    showSyncMessage("⚠️ Conflict detected. Server data applied.");
  }
}

setInterval(syncWithServer, 15000);

