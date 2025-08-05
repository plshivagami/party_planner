
const api = "https://fsa-crud-2aa9294fe819.herokuapp.com/api/2109-CPU-RM-WEB-PT/recipes";

let recipies = [];
let selectedRecipe;


async function getRecipes() {
    try {
        const response = await fetch(API);
        const json = await response.json();
        recipes = json.data;
    }
    catch (error) {
        console.error("Failed to fetch recipes:", err);
        
    }
}
async function selectedRecipe(id) {
    try {
        const response = await fetch(${ API } / ${ id });
        const json = await response.json();
        selectedRecipe = json.data;
        render();
    }
    catch (error) {
        console.error("failed to fetch recipe:", err);
    }
  
}
function RecipeListItem(recipe) {
    const $li = document.createElement("li");
    $li.textContent = recipe.name;
    $li.addEventListener("click", () => {
        getRecipe(recipe.id);
    })
    return $li;
}
function RecipeList() {
    const $ul = document.createElement("ul");
    $ul.classList.add("recipe-list");
    for (const recipe of recipes) {
        $ul.append(RecipeListItem(recipe));
    }
    return $ul;
}
function PartyDetails() {
    if (!selectedRecipe) {
        const $p = document.createElement("p");
        $p.textContent = "please select a recipe";
    }
    const $div = document.createElement("div");
    const $h3 = document.createElement("h3");
    $h3.textContent = selectedRecipe.name
    const $img = document.createElement("img");
}