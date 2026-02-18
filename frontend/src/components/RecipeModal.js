import React from 'react';
import './RecipeModal.css';

const RecipeModal = ({ recipe, onClose }) => {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{recipe.name}</h2>
          <button className="close-button" onClick={onClose}>×</button>
        </div>

        <div className="modal-body">
          <div className="recipe-image-container">
            <img src={recipe.image} alt={recipe.name} />
          </div>

          <div className="recipe-details">
            <div className="recipe-metadata">
              <span className="recipe-category">{recipe.category}</span>
              <span className="recipe-area">{recipe.area}</span>
            </div>

            <div className="ingredients-section">
              <h3>Ingredients</h3>
              <ul className="ingredients-list">
                {recipe.ingredients.map((item, index) => (
                  <li key={index}>
                    <span className="ingredient-measure">{item.measure}</span>
                    <span className="ingredient-name">{item.ingredient}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="instructions-section">
              <h3>Instructions</h3>
              <p>{recipe.instructions}</p>
            </div>

            {recipe.youtube && (
              <div className="youtube-section">
                <h3>Video Tutorial</h3>
                <a href={recipe.youtube} target="_blank" rel="noopener noreferrer" className="youtube-link">
                  Watch on YouTube
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeModal;