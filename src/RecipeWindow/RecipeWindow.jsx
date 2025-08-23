import recipeData from "../data/recipeData.json";
import "./RecipeWindow.css";

function RecipeWindow({ recipeId, closeRecipeWindow }) {
  let recipeObject;
  // Loop through the data to find the recipe object with the right ID
  for (let recipe of recipeData) {
    if (recipe.id === recipeId) {
      recipeObject = recipe;
      break;
    }
  }

  return (
    <div id="recipe-window">
      {/* Close icon */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="24px"
        viewBox="0 -960 960 960"
        width="24px"
        fill="#ffffff"
        onClick={closeRecipeWindow}
      >
        <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
      </svg>

      <h1 id="recipe-title">{recipeObject.name}</h1>
      <img src={recipeObject.img} alt={recipeObject.name} />

      <p id="recipe-description">{recipeObject.description}</p>

      <div id="ingredients">
        <h2>Ingredients</h2>
        <ul>
          {recipeObject.ingredients.map((ingredient, i) => {
            return <li key={i}>{ingredient}</li>;
          })}
        </ul>
      </div>

      <div id="instructions">
        <h2>Instructions</h2>
        <ol>
          {recipeObject.instructions.map((instruction, i) => {
            return <li key={i}>{instruction}</li>;
          })}
        </ol>
      </div>
    </div>
  );
}

export default RecipeWindow;
