const searchBox = document.querySelector(`.searchBox`);
const searchBtn = document.querySelector(`.searchBtn`);
const recipeContainer = document.querySelector(`.recipe-container`);
const recipeDetailContent = document.querySelector(`.recipe-detail-content`);
const recipeCloseBtn = document.querySelector(`.recipe-close-btn`);


// Function to get recipe
 const fetchRecipe = async (query) => {
    recipeContainer.innerHTML = "Fetching Recipes...";
    const data = await fetch (`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
    const response = await data.json();

    recipeContainer.innerHTML = "";
   // console.log(response.meals[0]);

    response.meals.forEach(meal => {
       //console.log(meals);

       const recipeDiv = document.createElement('div');
       recipeDiv.classList.add('recipe');
       recipeDiv.innerHTML = `
            <img src="${meal.strMealThumb}">;
            <h3>${meal.strMeal}</h3>
            <p><span>${meal.strArea}</span> Dish</p>
            <p>Belong to <span>${meal.strCategory}</span> Category</p>
       ` 
        const button = document.createElement(`button`);
        button.textContent = "View Recipe";
        recipeDiv.appendChild(button);

        //Adding EventListner to Recipe BUtton

        button.addEventListener(`click`, () => {
             openRecipePopup(meal);
        });

        recipeContainer.appendChild(recipeDiv);
    });
    
 }

 /* Function to fetch ingredients and mesurments */ 
 
    const fetchIngredients = (meal) => {
        //console.log(meal);
        let ingredientsList = "";
        for (let i = 1; i <= 20; i++) {
            const ingredient = meal[`strIngredient${i}`];
            if (ingredient) {
                const measure = meal[`strMeasure${i}`];
                ingredientsList += `<li>${measure} ${ingredient}</li>`                
            } else {
                break;
            }
        }
        return ingredientsList;
        
    }

 const openRecipePopup = (meal) => {
     recipeDetailContent.innerHTML = `
     <h2 class="recipeName">${meal.strMeal}</h2>
     <h3>Ingredents:</h3>
     <ul class= "ingredientList">${fetchIngredients(meal)}</ul>
    <div>
        <h3>Instruction: </h3>
        <p class= "recipInstractions">${meal.strInstructions}</p>
    </div>
`    
     recipeDetailContent.parentElement.style.display = "block";
    
 }



recipeCloseBtn.addEventListener(`click`, () => {
    recipeDetailContent.parentElement.style.display = "none";
});

searchBtn.addEventListener(`click`, (e) => {
    e.preventDefault();
    const searchInput = searchBox.value.trim(); 
    //console.log("Button Clicked");
    fetchRecipe(!searchInput); {
        recipeContainer.innerHTML = `<h2>Type the meal in search box</h2>`
    }
});