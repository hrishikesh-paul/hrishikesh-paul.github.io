import "./RecipeCard.css";

function RecipeCard({ recipeObject, setSelectedRecipeId }) {
  return (
    <div
      className="recipe-card"
      onClick={() => {
        setSelectedRecipeId(recipeObject.id);
      }}
    >
      <img src={recipeObject.img} alt={recipeObject.name} />
      <h2>{recipeObject.name}</h2>
    </div>
  );
}

export default RecipeCard;
