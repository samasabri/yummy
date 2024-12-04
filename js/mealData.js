$(document).ready(function () {
    //Meal Data
    async function getMealData() {
      let id = localStorage.getItem("id");
      let response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
      );
      let data = await response.json();
      showMealData(data);
    }
  
    getMealData();
  
    function showMealData(data) {
      let mealData = $("#mealData");
  
      for (let i = 0; i < data.meals.length; i++) {
        mealData.append(`
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
                <a href="${
                  data.meals[i].strSource
                }" target="_blank" class="btn btn-success ms-4">Source</a>
                <a href="${
                  data.meals[i].strYoutube
                }" target="_blank" class="btn btn-danger ms-4">Youtube</a>
              </div>
            </div>
          `);
      }
    }
  });