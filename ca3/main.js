
function updateRandomMeal(meal) {
    const mealNameElement = document.getElementById('meal-name1');
    const mealImageElement = document.getElementById('meal-image');
  
    mealNameElement.innerText = meal.strMeal;
    mealImageElement.src = meal.strMealThumb;
    mealImageElement.onclick = function() {
      showModal(meal);
  };
}

  
  
  // Function to fetch random meal data from the API
  function getRandomMeal() {
    axios
      .get('https://www.themealdb.com/api/json/v1/1/random.php')
      .then((res) => {
        const randomMeal = res.data.meals[0];
  
        // Update the random meal information
        updateRandomMeal(randomMeal);
      })
      .catch((error) => {
        console.error('Error fetching meal data:', error);
      });
  }
  
  // Fetch and display a random meal when the page is loaded
  document.addEventListener('DOMContentLoaded', getRandomMeal);
  
  // Fetch a new random meal when the page is refreshed
  window.addEventListener('beforeunload', getRandomMeal);

  
// Function to fetch related meal data based on the search input
function getRelatedMeals(searchTerm) {
    axios
      .get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${searchTerm}`)
      .then((res) => {
        const relatedMeals = res.data.meals;
  
        
        const relatedMealContainer = document.getElementById('related-meals');
        relatedMealContainer.innerHTML = '';
  
        // Display each related meal
        relatedMeals.forEach((meal) => {
          const relatedMealDiv = document.createElement('div');
          relatedMealDiv.classList.add('related-meal');
  
          const mealImage = document.createElement('img');
          mealImage.src = meal.strMealThumb;
          mealImage.addEventListener('click', () => {
            // Redirect to main.html with query parameters
            window.location.href =` main.html?name=${encodeURIComponent(meal.strMeal)}`;
          });
          const mealName = document.createElement('h5');
          mealName.innerText = meal.strMeal;
  
          relatedMealDiv.appendChild(mealImage);
          relatedMealDiv.appendChild(mealName);
  
          relatedMealContainer.appendChild(relatedMealDiv);
        });
      })
      .catch((error) => {
        console.error('Error fetching related meal data:', error);
      });
  }
  
  // Event listener for the search button
  document.getElementById('search-button').addEventListener('click', function () {
    const searchInput = document.getElementById('search').value.trim();
  
    // Fetch related meals based on the search input
    getRelatedMeals(searchInput);
  });
 
  function showModal(meal) {
    const modal = document.getElementById('myModal');
    const modalTitle = document.getElementById('modal-title');
    const modalContent = document.getElementById('modal-content');

    modalTitle.innerText = meal.strMeal;
    modalContent.innerHTML = `
      <button onclick="showIngredients('${meal.idMeal}')">Ingredients</button>
      <button onclick="showInstructions('${meal.idMeal}')">Instructions</button>
    `;

    modal.style.display = 'block';
  }

  function closeModal() {
    const modal = document.getElementById('myModal');
    modal.style.display = 'none';
  }









  function showIngredients(mealId) {
    // Fetch and display ingredients based on the mealId
    axios
      .get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
      .then((res) => {
        const ingredients = res.data.meals[0];
        const modalContent = document.getElementById('modal-content');
  
        const ingredientsList = document.createElement('ul'); // Create a new ul element
  
        // Extract and display ingredients
        for (let i = 1; i <= 20; i++) {
          const ingredient = ingredients[`strIngredient${i}`];
          const measure = ingredients[`strMeasure${i}`];
  
          if (ingredient && ingredient.trim() !== '') {
            const li = document.createElement('li');
            li.innerText = `${measure} ${ingredient}`;
            ingredientsList.appendChild(li);
          }
        }
  
        // Clear existing content in modal and append the new ingredients list
        modalContent.innerHTML = '';
        modalContent.appendChild(ingredientsList);
      })
      .catch((error) => {
        console.error('Error fetching ingredients:', error);
      });
  }
  

  function showInstructions(mealId) {
    // Fetch and display instructions based on the mealId
    axios
      .get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
      .then((res) => {
        const instructions = res.data.meals[0];
        const modalContent = document.getElementById('modal-content');
        modalContent.innerHTML = `<h4>${instructions.strInstructions}</h4>`;
      })
      .catch((error) => {
        console.error('Error fetching instructions:', error);
      });
  }
  