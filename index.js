const API =
  "https://fsa-crud-2aa9294fe819.herokuapp.com/api/2109-CPU-RM-WEB-PT/events";

let recipes = [];
let selectedRecipe;

async function getRecipes() {
  try {
    const response = await fetch(API);
    const json = await response.json();
    recipes = json.data;
  } catch (err) {
    console.error("Failed to fetch recipes:", err);
  }
}
async function getRecipe(id) {
  try {
    // https://fsa-crud-2aa9294fe819.herokuapp.com/api/2109-CPU-RM-WEB-PT/recipes/463
    const response = await fetch(`${API}/${id}`);
    const json = await response.json();
    selectedRecipe = json.data;
    render();
  } catch (err) {
    console.error("Failed to fetch recipes:", err);
  }
}
function RecipeListItem(recipe) {
  const $li = document.createElement("li");
  //const $a = document.createElement("a");

  // $a.href = "#selected";
  $li.textContent = recipe.name;
  $li.style.cursor = "pointer";
  $li.style.padding = "0.5rem 0.5rem";
  $li.style.border = "1px solid #ccc";
  $li.style.marginBottom = "10px";
  $li.style.borderRadius = "8px";

  $li.addEventListener("click", () => {
    getRecipe(recipe.id); // Load details when clicked
  });

  // $li.appendChild($a);
  return $li;
}
function RecipeList() {
  // TODO
  const $ul = document.createElement("ul");
  $ul.classList.add("recipe-list");
  $ul.style.listStyle = "none";

  for (const recipe of recipes) {
    $ul.append(RecipeListItem(recipe));
  }
  return $ul;
}
function PartyDetails() {
  if (!selectedRecipe) {
    const $p = document.createElement("p");
    $p.textContent = "Please select an recipe to learn more.";
    return $p;
  }

  // TODO
  const $div = document.createElement("div");

  const $h3 = document.createElement("h3");
  $h3.textContent = selectedRecipe.name;

  const $img = document.createElement("img");
  $img.src = selectedRecipe.imageUrl;
  $img.alt = selectedRecipe.name;
  $img.style.maxWidth = "200px";

  const $p = document.createElement("p");
  $p.textContent = selectedRecipe.description;

  $div.append($h3);
  $div.append($img);
  $div.append($p);
  return $div;
}
function render() {
  const $app = document.querySelector("#app");
  $app.innerHTML = `
    <h1 style="text-align : center">Party Planner</h1>
    <main style="display: flex; gap: 2rem;">
    <section style="flex: 1;">
        <h2 style = "text-align : center">Upcoming Parties</h2>
        <RecipeList></RecipeList>
      </section>
    <section id="selected" style="flex: 1;">
        <h2>Party Details</h2>
        <PartyDetails></PartyDetails>
      </section>
    </main>
  `;
  $app.querySelector("RecipeList").replaceWith(RecipeList());
  $app.querySelector("PartyDetails").replaceWith(PartyDetails());
}
async function init() {
  await getRecipes();
  render();
}

init();
