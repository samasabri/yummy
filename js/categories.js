$(document).ready(function () {
    // Fetch and display categories
    $.ajax({
      url: "https://www.themealdb.com/api/json/v1/1/categories.php",
      type: "GET",
      success: function (data) {
        let categories = data.categories;
        let categoryData = $("#categoryData");
        categoryData.empty(); // Clear any existing content
        for (let i = 0; i < categories.length; i++) {
          categoryData.append(`
            <div class="col-md-3">
              <div class="categories position-relative rounded-2 text-white">
                <div class="overlay d-flex flex-column justify-content-center align-items-center p-2">
                  <h3 data-category="${categories[i].strCategory}">${
            categories[i].strCategory
          }</h3>
                  <p class="fs-6 m-0 text-center">${categories[
                    i
                  ].strCategoryDescription
                    .split(" ")
                    .slice(0, 20)
                    .join(" ")}</p>
                </div>
                <img src="${
                  categories[i].strCategoryThumb
                }" class="w-100" alt="..."/>
              </div>
            </div>
          `);
        }
      },
    });
  
    // Handle category click to fetch and display meals
    $("#categoryData").on("click", ".categories", function () {
      let h3 = $(this).find("h3");
      let itemCategory = h3.attr("data-category");
      console.log(`Category clicked: ${itemCategory}`);
      getMealData(itemCategory);
    });
  
    // Fetch and display meals for a selected category
    async function getMealData(itemCategory) {
      console.log(`Fetching meals for category: ${itemCategory}`);
      let response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/filter.php?c=${itemCategory}`
      );
      let data = await response.json();
      console.log(`Meals data received:`, data);
      showMealData(data.meals);
    }
  
    function showMealData(data) {
      $("#categoriesSection").hide();
      $("#mealsSection").show();
      let mealData = $("#mealData");
      mealData.empty(); // Clear previous content
  
      for (let i = 0; i < data.length; i++) {
        mealData.append(`
          <div class="col-md-3">
            <div class="homeMeals position-relative rounded-2">
              <div class="overlay d-flex justify-content-center align-items-center">
                <h3>${data[i].strMeal}</h3>
              </div>
              <img src="${data[i].strMealThumb}" class="w-100" data-id="${data[i].idMeal}" alt="...">
            </div>
          </div>
        `);
      }
    }
  
    // Handle meal click to fetch and display meal details
    $("#mealData").on("click", ".homeMeals", function () {
      let img = $(this).find("img");
      let itemId = img.attr("data-id");
      console.log(`Meal clicked: ${itemId}`);
      getMealDetails(itemId);
    });
  
    // Fetch and display details for a selected meal
    async function getMealDetails(itemId) {
      console.log(`Fetching details for meal: ${itemId}`);
      let response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${itemId}`
      );
      let data = await response.json();
      console.log(`Meal details received:`, data);
      showMealDetails(data.meals[0]);
    }
  
    function showMealDetails(meal) {
      $("#mealsSection").hide();
      $("#mealDetailSection").show();
      let mealDetails = $("#mealDetails");
      mealDetails.empty(); // Clear previous content
  
      mealDetails.append(`
        <div class="col-md-4">
              <div class="meal position-relative rounded-2">
                <img src="${
                  data.meals[i].strMealThumb
                }" class="w-100 rounded-2" alt="...">
                <div>
                  <h2 class="text-center text-white mt-3">${
                    data.meals[i].strMeal
                  }</h2>
                </div>
              </div>
            </div>
            <div class="col-md-8">
              <div class="meal-details">
                <h3 class="text-white">Instructions</h3>
                <p class="text-white">${data.meals[i].strInstructions}</p>
              </div>
              <div class="meal-area d-flex align-items-center fs-4 py-3">
                <p class="text-white fw-bold m-0">Area:</p>
                <span class="text-white ms-2">${data.meals[i].strArea}</span>
              </div>
              <div class="meal-area d-flex align-items-center fs-4 py-3">
                <p class="text-white fw-bold m-0">Category:</p>
                <span class="text-white ms-2">${data.meals[i].strCategory}</span>
              </div>
              <div class="meal-ingredients py-3">
                <h3 class="text-white">Recipe:</h3>
                <ul class="text-white">
                  ${(function () {
                    let str = "";
                    for (let j = 1; j <= 20; j++) {
                      if (data.meals[i]["strIngredient" + j]) {
                        str += `<li class="d-inline-block p-2 m-2 bg-light rounded text-center text-dark">${
                          data.meals[i]["strMeasure" + j]
                        } ${data.meals[i]["strIngredient" + j]}</li>`;
                      } else {
                        break;
                      }
                    }
                    return str;
                  })()}
                </ul>
              </div>
              <div class="meal-area d-flex align-items-center py-3">
                <p class="text-white fw-bold m-0 fs-4">Tags:</p>
                ${(function () {
                  if (
                    data.meals[i].strTags &&
                    data.meals[i].strTags.trim() !== ""
                  ) {
                    if (data.meals[i].strTags.includes(",")) {
                      let tags = data.meals[i].strTags.split(",");
                      let tagsHtml = tags
                        .map(
                          (tag) =>
                            `<span class="text-dark fs-6 p-2 ms-2 bg-info rounded">${tag}</span>`
                        )
                        .join("");
                      return tagsHtml;
                    } else {
                      return `<span class="text-dark fs-6 p-2 ms-2 bg-info rounded">${data.meals[i].strTags}</span>`;
                    }
                  } else {
                    return `<span class="text-dark fs-6 p-2 ms-2 bg-info rounded">No tags available</span>`;
                  }
                })()}
              </div>
              <div class="meal-area d-flex align-items-center py-3">
                <button id="back" class="btn btn-secondary">Back</button>
                <a href="${
                  data.meals[i].strSource
                }" target="_blank" class="btn btn-success ms-4">Source</a>
                <a href="${
                  data.meals[i].strYoutube
                }" target="_blank" class="btn btn-danger ms-4">Youtube</a>
              </div>
            </div>
      `);
      console.log("Meal details displayed successfully");
    }
  
    // Handle back button to go back to categories
    $("#backToCategories").click(function () {
      $("#mealsSection").hide();
      $("#categoriesSection").show();
    });
  
    // Handle back button to go back to meals
    $("#backToMeals").click(function () {
      $("#mealDetailSection").hide();
      $("#mealsSection").show();
    });
  });