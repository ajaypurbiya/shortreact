import React, { useState } from 'react';

const RecipeFinderApp = () => {
  const [query, setQuery] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState(null);
  const appId = 'YOUR_EDAMAM_APP_ID';
  const appKey = 'YOUR_EDAMAM_API_KEY';

  const handleQueryChange = (event) => {
    setQuery(event.target.value);
  };

  const getRecipes = async () => {
    try {
      const response = await fetch(
        `https://api.edamam.com/search?q=${query}&app_id=${appId}&app_key=${appKey}`
      );

      if (!response.ok) {
        throw new Error('Error fetching recipes');
      }

      const data = await response.json();
      setRecipes(data.hits);
      setError(null);
    } catch (err) {
      setRecipes([]);
      setError(err.message);
    }
  };

  return (
    <div>
      <h1>Recipe Finder App</h1>
      <div>
        <input
          type="text"
          value={query}
          onChange={handleQueryChange}
          placeholder="Enter ingredients or dish name"
        />
        <button onClick={getRecipes}>Search Recipes</button>
      </div>
      {recipes.length > 0 && (
        <ul>
          {recipes.map((recipe) => (
            <li key={recipe.recipe.uri}>
              <h2>{recipe.recipe.label}</h2>
              <img src={recipe.recipe.image} alt={recipe.recipe.label} />
              <p>Ingredients: {recipe.recipe.ingredientLines.join(', ')}</p>
              <p>Calories: {Math.round(recipe.recipe.calories)}</p>
              <a href={recipe.recipe.url} target="_blank" rel="noopener noreferrer">
                View Recipe
              </a>
            </li>
          ))}
        </ul>
      )}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default RecipeFinderApp;
