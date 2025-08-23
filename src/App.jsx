import { useState, useEffect } from "react";
import { INITIAL_RECIPE_COUNT, RECIPE_INCREMENT } from "./constants.jsx";

import FiltersMenu from "./FiltersMenu/FiltersMenu.jsx";
import RecipeCard from "./RecipeCard/RecipeCard.jsx";
import RecipeWindow from "./RecipeWindow/RecipeWindow.jsx";
import recipeData from "./data/recipeData.json";

import "./index.css";

function App() {
  let [loadedRecipes, setLoadedRecipes] = useState(INITIAL_RECIPE_COUNT);
  let [selectedRecipeId, setSelectedRecipeId] = useState(null);

  let [filteredData, setFilteredData] = useState(recipeData);
  let [filtersMenuOpen, setFiltersMenuOpen] = useState(true);

  let [mainSectionStyle, setMainSectionStyle] = useState({});
  let [backgroundImageCaption, setBackgroundImageCaption] =
    useState("Loading caption...");

  // Loads `count` more recipes
  function loadMoreRecipes(count) {
    if (loadedRecipes <= filteredData.length) {
      setLoadedRecipes(loadedRecipes + count);
    }
    console.log(loadedRecipes);
  }

  // Randomize background image on load
  useEffect(() => {
    // Choose a random background image for #main-section
    let randomIndex = Math.floor(recipeData.length * Math.random());
    let backgroundImg = recipeData[randomIndex].img;
    let recipeName = recipeData[randomIndex].name;

    setMainSectionStyle({
      backgroundImage: `url("${backgroundImg}")`,
    });
    setBackgroundImageCaption(recipeName);
  }, []);

  return (
    <main>
      {/* Navbar */}
      <nav>
        <h1>VeganSearch</h1>
        {/* Menu icon SVG */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="48px"
          viewBox="0 -960 960 960"
          width="48px"
          fill="#000000"
        >
          <path d="M150-240q-12.75 0-21.37-8.68-8.63-8.67-8.63-21.5 0-12.82 8.63-21.32 8.62-8.5 21.37-8.5h660q12.75 0 21.38 8.68 8.62 8.67 8.62 21.5 0 12.82-8.62 21.32-8.63 8.5-21.38 8.5H150Zm0-210q-12.75 0-21.37-8.68-8.63-8.67-8.63-21.5 0-12.82 8.63-21.32 8.62-8.5 21.37-8.5h660q12.75 0 21.38 8.68 8.62 8.67 8.62 21.5 0 12.82-8.62 21.32-8.63 8.5-21.38 8.5H150Zm0-210q-12.75 0-21.37-8.68-8.63-8.67-8.63-21.5 0-12.82 8.63-21.32 8.62-8.5 21.37-8.5h660q12.75 0 21.38 8.68 8.62 8.67 8.62 21.5 0 12.82-8.62 21.32-8.63 8.5-21.38 8.5H150Z" />
        </svg>
      </nav>

      {/* Hero/heading section */}
      <div id="heading-section" style={mainSectionStyle}>
        <div id="heading-section-text">
          <h1>Recipes</h1>
          <p>
            Search from our 250+ recipe
            <br />
            database of vegan recipes!
          </p>
          <p id="heading-section-caption">{backgroundImageCaption}</p>
        </div>
      </div>

      {/* Filters ^ */}
      <div id="filters-tab" onClick={() => setFiltersMenuOpen(!filtersMenuOpen)}>
        <h1>Filters</h1>
        {/* Dropdown arrow SVG */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="40px"
          viewBox="0 -960 960 960"
          width="40px"
          fill="#000000"
        >
          <path d="M480-357.67q-6.67 0-12.33-2.16-5.67-2.17-11-7.5L263.33-560.67q-9.66-9.66-9.33-23.66.33-14 10-23.67 9.67-9.67 23.67-9.67 14 0 23.66 9.67L480-438.67 649.33-608q9.67-9.67 23.34-9.33 13.66.33 23.33 10 9.67 9.66 9.67 23.66T696-560L503.33-367.33q-5.33 5.33-11 7.5-5.66 2.16-12.33 2.16Z" />
        </svg>
      </div>

      {/* Filters menu */}
      <FiltersMenu
        tabs={["Category", "Cuisine", "Ingredients", "Occasion"]}
        colors={["#9cfff8", "#ffc0f5", "#9fff9d", "#fffa9c"]}
        updateFilteredData={setFilteredData}
        setLoadedRecipes={setLoadedRecipes}
        filtersMenuOpen={filtersMenuOpen}
      />

      {/* All recipe cards */}
      <div id="cards">
        {filteredData.slice(0, loadedRecipes).map((recipeObject) => {
          return (
            <RecipeCard
              recipeObject={recipeObject}
              setSelectedRecipeId={setSelectedRecipeId}
              key={recipeObject.id}
            />
          );
        })}
      </div>

      {/* Load more button */}
      <button
        id="load-more"
        className={loadedRecipes >= filteredData.length ? "disabled" : ""}
        onClick={() => {
          loadMoreRecipes(RECIPE_INCREMENT);
        }}
      >
        Load more
      </button>

      {/* Floationg recipe window */}
      {selectedRecipeId && (
        <RecipeWindow
          recipeId={selectedRecipeId}
          closeRecipeWindow={() => {
            setSelectedRecipeId(null);
          }}
        />
      )}
    </main>
  );
}

export default App;
