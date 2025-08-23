import { useState, useEffect } from "react";
import { INITIAL_RECIPE_COUNT } from "../constants";

import recipeData from "../data/recipeData.json";
import categories from "../data/categories.json";
import "./FiltersMenu.css";

function FilterSelect(props) {
  // Count how many recipes have this category
  let count = 0;
  for (let recipeObject of props.data) {
    if (recipeObject.categories.includes(props.name)) {
      count++;
    }
  }

  return (
    count !== 0 && (
      <div
        className={
          // If this category has been selected, add the "selected" class
          props.selectedCategories.includes(props.name)
            ? "filter-select selected"
            : "filter-select"
        }
        onClick={props.onFilterClick}
      >
        <span className="category-name">{props.name}</span>
        <span className="category-count">{count}</span>
      </div>
    )
  );
}

function FiltersMenu(props) {
  let [currentTabIndex, setCurrentTabIndex] = useState(0);
  let [selectedCategories, setSelectedCategories] = useState([]);

  useEffect(applyFilters, [selectedCategories]);

  function getTabStyle(i) {
    // Returns the styling for the tab with index i.
    if (i === currentTabIndex) {
      // This tab is selected
      return {
        backgroundColor: props.colors[i],
        top: "0px",
      };
    } else {
      // This tab is unselected
      return {
        backgroundColor: props.colors[i],
        filter: "brightness(0.9)", // Darken
        top: "5px", // Move down
      };
    }
  }

  function toggleCategory(category) {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  }

  function applyFilters() {
    props.updateFilteredData(getFilteredData());
    props.setLoadedRecipes(INITIAL_RECIPE_COUNT);
  }

  // Returns an array containing all recipes that satisfy the filters
  function getFilteredData() {
    let filteredData = [];
    for (let recipeObject of recipeData) {
      if (
        new Set(selectedCategories).isSubsetOf(new Set(recipeObject.categories))
      ) {
        filteredData.push(recipeObject);
      }
    }
    return filteredData;
  }

  return (
    <div id="filters-menu" className={props.filtersMenuOpen ? "" : "closed"}>
      <div id="filters-tab-row">
        {props.tabs.map((tabName, i) => {
          return (
            <p
              key={i}
              style={getTabStyle(i)}
              onClick={() => {
                setCurrentTabIndex(i);
              }}
            >
              {tabName}
            </p>
          );
        })}
      </div>

      <div
        id="filters-selection"
        style={{
          backgroundColor: props.colors[currentTabIndex],
        }}
      >
        {Object.entries(categories).map(([category, group]) => {
          return (
            group === props.tabs[currentTabIndex] && (
              <FilterSelect
                name={category}
                data={getFilteredData()}
                selectedCategories={selectedCategories}
                onFilterClick={() => {
                  toggleCategory(category);
                }}
                key={category}
              />
            )
          );
        })}
      </div>

      <button
        id="clear-filters"
        style={{ backgroundColor: props.colors[currentTabIndex] }}
        onClick={() => setSelectedCategories([])}
      >
        Clear filters
      </button>
    </div>
  );
}

export default FiltersMenu;
