const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.get('/api/search', async (req, res) => {
  try {
    const query = req.query.q;
    const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
    
    if (response.data.meals) {
      const formattedRecipes = response.data.meals.map(meal => ({
        id: meal.idMeal,
        name: meal.strMeal,
        category: meal.strCategory,
        area: meal.strArea,
        instructions: meal.strInstructions,
        image: meal.strMealThumb,
        youtube: meal.strYoutube,
        ingredients: getIngredients(meal)
      }));
      res.json(formattedRecipes);
    } else {
      res.json([]);
    }
  } catch (error) {
    console.error('Error fetching recipes:', error);
    res.status(500).json({ message: 'Failed to fetch recipes' });
  }
});

function getIngredients(meal) {
  const ingredients = [];
  
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];
    
    if (ingredient && ingredient.trim() !== '') {
      ingredients.push({
        ingredient,
        measure: measure || ''
      });
    }
  }
  
  return ingredients;
}

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});