import React from 'react';
import './RecipeCard.css';

const RecipeCard = ({ recipe, onClick }) => {
  return (
    <div className="recipe-card" onClick={onClick}>
      <div className="recipe-image">
        <img src={recipe.image} alt={recipe.name} />
      </div>
      <div className="recipe-info">
        <h2>{recipe.name}</h2>
        <div className="recipe-meta">
          <span className="recipe-category">{recipe.category}</span>
          <span className="recipe-area">{recipe.area}</span>
        </div>
        <button className="view-recipe">View Recipe</button>
      </div>
    </div>
  );
};

export default RecipeCard;