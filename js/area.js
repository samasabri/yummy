$(document).ready(function () {
    // Fetch and display areas
    $.ajax({
      url: "https://www.themealdb.com/api/json/v1/1/list.php?a=list",
      type: "GET",
      success: function (data) {
        let areas = data.meals;
        let areaData = $("#areaData");
        areaData.empty(); // Clear any existing content
        for (let i = 0; i < areas.length; i++) {
          areaData.append(`
              <div class="col-md-3">
                <div class="areas position-relative rounded-2 text-white">
                  <div class="d-flex flex-column justify-content-center align-items-center p-2">
                  <i class="fa-solid fa-house-laptop fa-4x mb-3"></i>
                    <h3 data-area="${areas[i].strArea}">${areas[i].strArea}</h3>
                  </div>
                </div>
              </div>
            `);
        }
      },
    });
  
    // Handle area click to fetch and display meals
    $("#areaData").on("click", ".areas", function () {
      let h3 = $(this).find("h3");
      let itemArea = h3.attr("data-area");
      console.log(`Area clicked: ${itemArea}`);
      getMealData(itemArea);
    });
  
    // Fetch and display meals for a selected area
    async function getMealData(itemArea) {
      console.log(`Fetching meals for area: ${itemArea}`);
      let response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/filter.php?a=${itemArea}`
      );
      let data = await response.json();
      console.log(`Meals data received:`, data);
      showMealData(data.meals);
    }
  
    function showMealData(data) {
      $("#areasSection").hide();
      $("#mealsSection").show();
      let mealData = $("#mealData");
      mealData.empty(); // Clear previous content
  
      for (let i = 0; i < data.length; i++) {
        mealData.append(`
            <div class="col-md-3">
              <div class="homeMeals position-relative rounded-2">
                <div class="overlay d-flex justify-content-center align-items-center text-center">
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
                    meal.strMealThumb
                  }" class="w-100 rounded-2" alt="...">
                  <div>
                    <h2 class="text-center text-white mt-3">${meal.strMeal}</h2>
                  </div>
                </div>
              </div>
              <div class="col-md-8">
                <div class="meal-details">
                  <h3 class="text-white">Instructions</h3>
                  <p class="text-white">${meal.strInstructions}</p>
                </div>
                <div class="meal-area d-flex align-items-center fs-4 py-3">
                  <p class="text-white fw-bold m-0">Area:</p>
                  <span class="text-white ms-2">${meal.strArea}</span>
                </div>
                <div class="meal-area d-flex align-items-center fs-4 py-3">
                  <p class="text-white fw-bold m-0">Category:</p>
                  <span class="text-white ms-2">${meal.strCategory}</span>
                </div>
                <div class="meal-ingredients py-3">
                  <h3 class="text-white">Recipe:</h3>
                  <ul class="text-white">
                    ${(function () {
                      let str = "";
                      for (let j = 1; j <= 20; j++) {
                        if (meal["strIngredient" + j]) {
                          str += `<li class="d-inline-block p-2 m-2 bg-light rounded text-center text-dark">${
                            meal["strMeasure" + j]
                          } ${meal["strIngredient" + j]}</li>`;
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
                    if (meal.strTags && meal.strTags.trim() !== "") {
                      if (meal.strTags.includes(",")) {
                        let tags = meal.strTags.split(",");
                        let tagsHtml = tags
                          .map(
                            (tag) =>
                              `<span class="text-dark fs-6 p-2 ms-2 bg-info rounded">${tag}</span>`
                          )
                          .join("");
                        return tagsHtml;
                      } else {
                        return `<span class="text-dark fs-6 p-2 ms-2 bg-info rounded">${meal.strTags}</span>`;
                      }
                    } else {
                      return `<span class="text-dark fs-6 p-2 ms-2 bg-info rounded">No tags available</span>`;
                    }
                  })()}
                </div>
                <div class="meal-area d-flex align-items-center py-3">
                  <a href="${
                    meal.strSource
                  }" target="_blank" class="btn btn-success ms-4">Source</a>
                  <a href="${
                    meal.strYoutube
                  }" target="_blank" class="btn btn-danger ms-4">Youtube</a>
                </div>
        `);
      console.log("Meal details displayed successfully");
    }
  
    // Handle back button to go back to areas
    $("#backToAreas").click(function () {
      $("#mealsSection").hide();
      $("#areasSection").show();
    });
  
    // Handle back button to go back to meals
    $("#backToMeals").click(function () {
      $("#mealDetailSection").hide();
      $("#mealsSection").show();
    });
  });