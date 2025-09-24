// API key is now loaded from config.js
const recipeListEl = document.getElementById("recipe-list");

function displayRecipes(recipes) {
  recipeListEl.innerHTML = "";
  recipes.forEach((recipe) => {
    const recipeItemEl = document.createElement("li");
    recipeItemEl.classList.add("recipe-item");
    const recipeImageEl = document.createElement("img");
    recipeImageEl.src = recipe.image;
    recipeImageEl.alt = "recipe image";

    const recipeTitleEl = document.createElement("h2");
    recipeTitleEl.innerText = recipe.title;

    const recipeIngredientsEl = document.createElement("p");
    recipeIngredientsEl.innerHTML = `
        <strong>Ingredients:</strong> ${recipe.extendedIngredients
          .map((ingredient) => ingredient.original)
          .join(", ")}
    `;

    const recipeLinkEl = document.createElement("a");
    recipeLinkEl.href = recipe.sourceUrl;
    recipeLinkEl.innerText = "View Recipe";

    recipeItemEl.appendChild(recipeImageEl);
    recipeItemEl.appendChild(recipeTitleEl);
    recipeItemEl.appendChild(recipeIngredientsEl);
    recipeItemEl.appendChild(recipeLinkEl);
    recipeListEl.appendChild(recipeItemEl);
  });
}

async function getRecipes() {
  const response = await fetch(
    `https://api.spoonacular.com/recipes/random?number=6&apiKey=${API_KEY}`
  );

  const data = await response.json();

  return data.recipes;
}

async function init() {
  const recipes = await getRecipes();
  displayRecipes(recipes);
}

init();

// Function to load the appropriate CSS file based on the screen size
function loadStylesheet() {
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.type = 'text/css';

  if (window.innerWidth <= 768) {
    // Load the mobile CSS
    link.href = 'style-mobile.css';
  } else {
    // Load the desktop CSS
    link.href = 'style-desktop.css';
  }

  document.head.appendChild(link);
}

// Event listeners to load the correct stylesheet on page load and window resize
window.addEventListener('load', loadStylesheet);
window.addEventListener('resize', loadStylesheet);
document.getElementById("loginForm").addEventListener("submit", function(event) {
  event.preventDefault(); // Prevent default form submission

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  // Log the user data to the console (simulating terminal output)
  console.log(`Email: ${email}, Password: ${password}`);

  // Redirect to intro page after logging data
  setTimeout(() => {
      window.location.href = "intro.html";
  }, 500); // Slight delay before redirecting
});
