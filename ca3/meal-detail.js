document.addEventListener('DOMContentLoaded', () => {
  const mealName = getQueryParam('name');

  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(mealName)}`)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      const meal = data.meals[0];
       // Log the API response to the console

      
      // Display meal details
      document.getElementById('meal-image').innerHTML = `<img src="${meal.strMealThumb}" alt="${meal.strMeal}">`;
      document.getElementById('meal-name').innerText = meal.strMeal;
      document.getElementById('instructions').innerText = meal.strInstructions;

      const ingredientsList = document.getElementById('ingredients');
      // Extract and display ingredients
      for (let i = 1; i <= 20; i++) {
        const ingredient = meal[`strIngredient${i}`];
        const measure = meal[`strMeasure${i}`];

        if (ingredient && ingredient.trim() !== '') {
          const li = document.createElement('li');
          li.innerText = `${measure} ${ingredient}`;
          ingredientsList.appendChild(li);
        }
      }
    })
    .catch(error => {
      console.error('Error fetching meal details:', error);
    });

  
  
});

function getQueryParam(name) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(name);
}

document.getElementById('back-button').addEventListener('click', () => {
  // Redirect to the first page
  window.location.href = 'index.html';
});

