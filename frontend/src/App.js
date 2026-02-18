import React, { useState } from 'react';
import './App.css';
import RecipeCard from './components/RecipeCard';
import RecipeModal from './components/RecipeModal';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const searchRecipes = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    
    setLoading(true);
    setHasSearched(true);
    
    try {
      const response = await fetch(`http://localhost:5000/api/search?q=${searchQuery}`);
      const data = await response.json();
      setRecipes(data);
    } catch (error) {
      console.error('Error searching recipes:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      searchRecipes(e);
    }
  };

  const openRecipeModal = (recipe) => {
    setSelectedRecipe(recipe);
  };

  const closeRecipeModal = () => {
    setSelectedRecipe(null);
  };

  return (
    <div className="app">
      <header className="header">
        <div className="header-content">
          <h1>Delicious Recipe Finder</h1>
          <div className="search-container">
            <input
              type="text"
              placeholder="Search for recipes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <button onClick={searchRecipes}>Search</button>
          </div>
          
          {/* No results message directly below search box */}
          {hasSearched && recipes.length === 0 && !loading && (
            <div className="no-results-container">
              <div className="no-results">
                No recipes found. Try another search!
              </div>
            </div>
          )}
        </div>
      </header>

      <main className="main-content">
        {loading ? (
          <div className="loading">Loading recipes...</div>
        ) : (
          <div className="recipes-grid">
            {recipes.length > 0 && recipes.map((recipe) => (
              <RecipeCard 
                key={recipe.id} 
                recipe={recipe} 
                onClick={() => openRecipeModal(recipe)} 
              />
            ))}
          </div>
        )}
      </main>

      {selectedRecipe && (
        <RecipeModal recipe={selectedRecipe} onClose={closeRecipeModal} />
      )}
    </div>
  );
}

export default App;