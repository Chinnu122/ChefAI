// Recipe Database - Sample recipes organized by cuisine and meal type
const recipeDatabase = {
    italian: {
        breakfast: [
            {
                name: "Italian Frittata",
                time: "20 min",
                servings: 4,
                difficulty: "Easy",
                ingredients: [
                    "8 large eggs",
                    "1/4 cup milk",
                    "1 cup cherry tomatoes, halved",
                    "1/2 cup mozzarella cheese, shredded",
                    "1/4 cup fresh basil, chopped",
                    "2 tbsp olive oil",
                    "Salt and pepper to taste"
                ],
                instructions: [
                    "Preheat oven to 375°F (190°C)",
                    "Whisk eggs and milk in a bowl, season with salt and pepper",
                    "Heat olive oil in an oven-safe skillet over medium heat",
                    "Add tomatoes and cook for 2 minutes",
                    "Pour egg mixture over tomatoes",
                    "Sprinkle with cheese and basil",
                    "Transfer to oven and bake for 15 minutes until set",
                    "Let cool slightly, slice and serve"
                ]
            }
        ],
        lunch: [
            {
                name: "Caprese Panini",
                time: "15 min",
                servings: 2,
                difficulty: "Easy",
                ingredients: [
                    "4 slices ciabatta bread",
                    "2 large tomatoes, sliced",
                    "8 oz fresh mozzarella, sliced",
                    "Fresh basil leaves",
                    "2 tbsp balsamic glaze",
                    "2 tbsp olive oil",
                    "Salt and pepper to taste"
                ],
                instructions: [
                    "Brush bread slices with olive oil",
                    "Layer mozzarella, tomato, and basil on two slices",
                    "Drizzle with balsamic glaze, season with salt and pepper",
                    "Top with remaining bread slices",
                    "Grill in panini press or skillet until cheese melts",
                    "Serve hot and enjoy"
                ]
            }
        ],
        dinner: [
            {
                name: "Classic Spaghetti Carbonara",
                time: "25 min",
                servings: 4,
                difficulty: "Medium",
                ingredients: [
                    "1 lb spaghetti",
                    "4 oz pancetta or bacon, diced",
                    "4 large eggs",
                    "1 cup Parmesan cheese, grated",
                    "4 cloves garlic, minced",
                    "Black pepper to taste",
                    "Salt for pasta water",
                    "Fresh parsley for garnish"
                ],
                instructions: [
                    "Bring a large pot of salted water to boil",
                    "Cook spaghetti according to package directions",
                    "Meanwhile, cook pancetta in a large skillet until crispy",
                    "Add garlic and cook for 1 minute",
                    "In a bowl, whisk eggs and Parmesan cheese",
                    "Drain pasta, reserving 1 cup pasta water",
                    "Add hot pasta to pancetta, remove from heat",
                    "Quickly stir in egg mixture, adding pasta water as needed",
                    "Season with black pepper and garnish with parsley",
                    "Serve immediately"
                ]
            }
        ],
        dessert: [
            {
                name: "Tiramisu",
                time: "30 min + chilling",
                servings: 8,
                difficulty: "Medium",
                ingredients: [
                    "6 egg yolks",
                    "3/4 cup sugar",
                    "1 1/3 cups mascarpone cheese",
                    "2 cups heavy cream",
                    "2 cups strong espresso, cooled",
                    "3 tbsp coffee liqueur",
                    "24 ladyfinger cookies",
                    "Cocoa powder for dusting"
                ],
                instructions: [
                    "Beat egg yolks and sugar until thick and pale",
                    "Add mascarpone and beat until smooth",
                    "Whip cream to soft peaks and fold into mascarpone mixture",
                    "Mix espresso and liqueur in a shallow dish",
                    "Quickly dip ladyfingers in coffee mixture",
                    "Arrange half the ladyfingers in a dish",
                    "Spread half the mascarpone mixture over cookies",
                    "Repeat layers",
                    "Dust with cocoa powder",
                    "Refrigerate for at least 4 hours before serving"
                ]
            }
        ]
    },
    mexican: {
        breakfast: [
            {
                name: "Huevos Rancheros",
                time: "20 min",
                servings: 4,
                difficulty: "Easy",
                ingredients: [
                    "8 eggs",
                    "4 corn tortillas",
                    "1 can black beans, drained",
                    "1 cup salsa",
                    "1 cup shredded cheese",
                    "1 avocado, sliced",
                    "2 tbsp vegetable oil",
                    "Cilantro and lime for garnish"
                ],
                instructions: [
                    "Warm black beans in a small saucepan",
                    "Heat oil in a skillet and fry tortillas until slightly crispy",
                    "Fry eggs to your preference",
                    "Place tortillas on plates",
                    "Top each with beans, fried eggs, and salsa",
                    "Sprinkle with cheese and avocado",
                    "Garnish with cilantro and lime",
                    "Serve immediately"
                ]
            }
        ],
        lunch: [
            {
                name: "Chicken Quesadillas",
                time: "20 min",
                servings: 4,
                difficulty: "Easy",
                ingredients: [
                    "4 large flour tortillas",
                    "2 cups cooked chicken, shredded",
                    "2 cups Mexican cheese blend",
                    "1 bell pepper, sliced",
                    "1 onion, sliced",
                    "2 tbsp olive oil",
                    "Sour cream and salsa for serving"
                ],
                instructions: [
                    "Sauté peppers and onions in olive oil until soft",
                    "Heat a large skillet over medium heat",
                    "Place one tortilla in skillet",
                    "Add cheese, chicken, and vegetables to half the tortilla",
                    "Fold tortilla in half",
                    "Cook until golden and cheese melts, flip once",
                    "Repeat with remaining tortillas",
                    "Cut into wedges and serve with sour cream and salsa"
                ]
            }
        ],
        dinner: [
            {
                name: "Beef Enchiladas",
                time: "45 min",
                servings: 6,
                difficulty: "Medium",
                ingredients: [
                    "1 lb ground beef",
                    "1 onion, diced",
                    "2 cups enchilada sauce",
                    "12 corn tortillas",
                    "3 cups shredded cheese",
                    "1 can black beans",
                    "2 tsp cumin",
                    "Cilantro and sour cream for topping"
                ],
                instructions: [
                    "Preheat oven to 375°F",
                    "Brown ground beef with onion and cumin",
                    "Warm tortillas to make them pliable",
                    "Spread 1/2 cup enchilada sauce in baking dish",
                    "Fill each tortilla with beef mixture and cheese",
                    "Roll up and place seam-side down in dish",
                    "Pour remaining sauce over enchiladas",
                    "Top with remaining cheese",
                    "Bake for 25 minutes until bubbly",
                    "Garnish with cilantro and sour cream"
                ]
            }
        ]
    },
    chinese: {
        dinner: [
            {
                name: "Kung Pao Chicken",
                time: "30 min",
                servings: 4,
                difficulty: "Medium",
                ingredients: [
                    "1 lb chicken breast, cubed",
                    "1/2 cup roasted peanuts",
                    "3 dried red chilies",
                    "1 bell pepper, cubed",
                    "3 green onions, chopped",
                    "3 cloves garlic, minced",
                    "2 tbsp soy sauce",
                    "1 tbsp rice vinegar",
                    "1 tbsp cornstarch",
                    "2 tbsp vegetable oil"
                ],
                instructions: [
                    "Marinate chicken in soy sauce and cornstarch for 15 minutes",
                    "Heat oil in a wok over high heat",
                    "Stir-fry chicken until golden, remove and set aside",
                    "Add chilies, garlic, and bell pepper, stir-fry 2 minutes",
                    "Return chicken to wok",
                    "Add vinegar and remaining soy sauce",
                    "Toss in peanuts and green onions",
                    "Cook for 2 more minutes",
                    "Serve hot over rice"
                ]
            }
        ]
    },
    indian: {
        dinner: [
            {
                name: "Butter Chicken",
                time: "40 min",
                servings: 6,
                difficulty: "Medium",
                ingredients: [
                    "2 lbs chicken thighs, cubed",
                    "1 cup yogurt",
                    "1 can tomato sauce",
                    "1/2 cup heavy cream",
                    "4 tbsp butter",
                    "1 onion, diced",
                    "4 cloves garlic, minced",
                    "1 tbsp ginger, minced",
                    "2 tsp garam masala",
                    "1 tsp turmeric",
                    "Cilantro for garnish"
                ],
                instructions: [
                    "Marinate chicken in yogurt, garam masala, and turmeric for 30 minutes",
                    "Heat butter in a large pan",
                    "Sauté onion, garlic, and ginger until soft",
                    "Add marinated chicken and cook until done",
                    "Add tomato sauce and simmer for 15 minutes",
                    "Stir in cream and cook for 5 more minutes",
                    "Garnish with cilantro",
                    "Serve with naan or rice"
                ]
            }
        ]
    },
    japanese: {
        dinner: [
            {
                name: "Teriyaki Salmon",
                time: "25 min",
                servings: 4,
                difficulty: "Easy",
                ingredients: [
                    "4 salmon fillets",
                    "1/4 cup soy sauce",
                    "2 tbsp honey",
                    "2 tbsp mirin",
                    "1 tbsp rice vinegar",
                    "2 cloves garlic, minced",
                    "1 tsp ginger, grated",
                    "Sesame seeds and green onions for garnish"
                ],
                instructions: [
                    "Mix soy sauce, honey, mirin, vinegar, garlic, and ginger",
                    "Marinate salmon for 15 minutes",
                    "Heat a non-stick pan over medium-high heat",
                    "Cook salmon skin-side down for 4 minutes",
                    "Flip and cook for 3 more minutes",
                    "Pour remaining marinade over salmon",
                    "Cook until sauce thickens",
                    "Garnish with sesame seeds and green onions",
                    "Serve with steamed rice and vegetables"
                ]
            }
        ]
    },
    mediterranean: {
        lunch: [
            {
                name: "Mediterranean Quinoa Bowl",
                time: "25 min",
                servings: 4,
                difficulty: "Easy",
                ingredients: [
                    "2 cups quinoa, cooked",
                    "1 cucumber, diced",
                    "2 tomatoes, diced",
                    "1 cup chickpeas",
                    "1/2 cup feta cheese",
                    "1/4 cup olives",
                    "2 tbsp olive oil",
                    "Juice of 1 lemon",
                    "Fresh parsley and mint"
                ],
                instructions: [
                    "Cook quinoa according to package directions",
                    "Let quinoa cool slightly",
                    "In a large bowl, combine quinoa with vegetables",
                    "Add chickpeas, feta, and olives",
                    "Whisk together olive oil and lemon juice",
                    "Pour dressing over bowl and toss",
                    "Add fresh herbs",
                    "Serve at room temperature or chilled"
                ]
            }
        ]
    }
};

// Dietary modifications
const dietaryAdjustments = {
    vegetarian: "Replace meat with tofu, tempeh, or extra vegetables",
    vegan: "Use plant-based alternatives for all dairy and eggs",
    "gluten-free": "Use gluten-free pasta, bread, or grain alternatives",
    keto: "Reduce carbs and increase healthy fats and proteins",
    paleo: "Use whole, unprocessed ingredients and avoid grains and dairy"
};

// Get a random recipe based on cuisine and meal type
function getRecipe(cuisine, mealType, dietary) {
    let recipe = null;
    
    // Check if cuisine and meal type exist in database
    if (recipeDatabase[cuisine] && recipeDatabase[cuisine][mealType]) {
        const recipes = recipeDatabase[cuisine][mealType];
        recipe = recipes[Math.floor(Math.random() * recipes.length)];
    } else {
        // Fallback to any recipe from the cuisine
        const cuisineRecipes = recipeDatabase[cuisine];
        if (cuisineRecipes) {
            const allMeals = Object.values(cuisineRecipes).flat();
            recipe = allMeals[Math.floor(Math.random() * allMeals.length)];
        }
    }
    
    // If still no recipe, get any random recipe
    if (!recipe) {
        const allCuisines = Object.values(recipeDatabase);
        const allRecipes = allCuisines.flatMap(c => Object.values(c)).flat();
        recipe = allRecipes[Math.floor(Math.random() * allRecipes.length)];
    }
    
    // Add dietary note if applicable
    if (dietary && dietary !== 'none') {
        recipe.dietaryNote = dietaryAdjustments[dietary];
    }
    
    return recipe;
}

// Display recipe in the output section
function displayRecipe(recipe) {
    const output = document.getElementById('recipe-output');
    
    const dietaryNote = recipe.dietaryNote 
        ? `<div class="meta-item" style="background: #ffe66d; padding: 0.5rem 1rem; border-radius: 5px; grid-column: 1/-1;">
               <strong>💡 Dietary Tip:</strong> ${recipe.dietaryNote}
           </div>` 
        : '';
    
    output.innerHTML = `
        <div class="recipe-content">
            <h3>${recipe.name}</h3>
            <div class="recipe-meta">
                <div class="meta-item">⏱️ ${recipe.time}</div>
                <div class="meta-item">🍽️ ${recipe.servings} servings</div>
                <div class="meta-item">📊 ${recipe.difficulty}</div>
                ${dietaryNote}
            </div>
            
            <h4>Ingredients:</h4>
            <ul>
                ${recipe.ingredients.map(ing => `<li>${ing}</li>`).join('')}
            </ul>
            
            <h4>Instructions:</h4>
            <ol>
                ${recipe.instructions.map(step => `<li>${step}</li>`).join('')}
            </ol>
        </div>
    `;
}

// Handle form submission
document.getElementById('recipe-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const cuisine = document.getElementById('cuisine').value;
    const mealType = document.getElementById('meal-type').value;
    const dietary = document.getElementById('dietary').value;
    const ingredients = document.getElementById('ingredients').value;
    
    // Show loading state
    const output = document.getElementById('recipe-output');
    output.innerHTML = `
        <div class="placeholder">
            <div class="loading"></div>
            <p style="margin-top: 1rem;">Generating your perfect recipe...</p>
        </div>
    `;
    
    // Simulate AI processing time
    setTimeout(() => {
        const recipe = getRecipe(cuisine, mealType, dietary);
        displayRecipe(recipe);
    }, 1000);
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add some interactivity to featured recipe cards
document.querySelectorAll('.recipe-preview-card').forEach(card => {
    card.addEventListener('click', function() {
        alert('Full recipe feature coming soon! Use the Recipe Generator above to get started.');
    });
});

// Initialize - Show a welcome message
console.log('🍳 ChefAI loaded successfully!');
console.log('Ready to generate amazing recipes for you.');
