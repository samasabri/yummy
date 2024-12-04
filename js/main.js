$(document).ready(function () {
    // Show the loading spinner
    $(".loading-overlay").show();
  
    // Side Bar
    $("#bars").on("click", function () {
      $("#bars").addClass("d-none");
      $("#close").removeClass("d-none").addClass("d-block");
      $(".sideBar-ul").css("left", "0");
    });
  
    $("#close").on("click", function () {
      $("#close").addClass("d-none");
      $("#bars").removeClass("d-none").addClass("d-block");
      $(".sideBar-ul").css("left", "-250px");
    });
  
    $(".sideBar-ul ul li").on("click", function () {
      $(".sideBar-ul").css("left", "-250px");
      $("#close").addClass("d-none");
      $("#bars").removeClass("d-none").addClass("d-block");
    });
  
    // homePage
    var rowData = $("#rowData");
  
    async function getData(query = "") {
      let response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`
      );
      let data = await response.json();
      showData(data);
      $(".loading-overlay").hide();
    }
  
    getData();
  
    function showData(data) {
      rowData.empty();
      if (data.meals) {
        for (let i = 0; i < data.meals.length; i++) {
          rowData.append(`
            <div class="col-md-3">
              <div class="homeMeals position-relative rounded-2">
                <div class="overlay d-flex justify-content-center align-items-center">
                  <h3>${data.meals[i].strMeal}</h3>
                </div>
                <img src="${data.meals[i].strMealThumb}" class="w-100" data-id="${data.meals[i].idMeal}" alt="...">
              </div>
            </div>
          `);
        }
      } else {
        rowData.append(`<p class="text-white">No meals found</p>`);
      }
    }
  
    $(document).on("click", ".homeMeals", function () {
      let itemId = $(this).find("img").data("id");
      localStorage.setItem("id", itemId);
      $("#rowData").load("mealData.html");
    });
  
    // Search functionality
    $("#search").on("click", function () {
      rowData.empty();
      rowData.append(`
        <div class="col-md-6 d-flex justify-content-center align-items-center gap-3 mx-auto search">
          <input type="text" class="form-control bg-dark border border-0 text-white" id="searchName" placeholder="Search by name">
          <input type="text" class="form-control bg-dark border border-0 text-white" id="searchFirstLetter" placeholder="Search by first letter">
        </div>
        <div id="searchResults" class="row g-4"></div>
      `);
  
      // Filter by name
      $("#searchName").on("input", function () {
        let value = $(this).val().toLowerCase();
        if (value.length > 2) {
          getSearchResults(value, "name");
        } else {
          $("#searchResults")
            .empty()
            .append(
              `<p class="text-white">Please enter at least 2 characters</p>`
            );
        }
      });
  
      // Filter by first letter
      $("#searchFirstLetter").on("input", function () {
        let value = $(this).val().toLowerCase();
        if (value.length === 1) {
          getSearchResults(value, "firstLetter");
        } else {
          $("#searchResults")
            .empty()
            .append(`<p class="text-white">Please enter a single letter</p>`);
        }
      });
    });
  
    async function getSearchResults(query, type) {
      let url;
      if (type === "name") {
        url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`;
      } else if (type === "firstLetter") {
        url = `https://www.themealdb.com/api/json/v1/1/search.php?f=${query}`;
      }
      let response = await fetch(url);
      let data = await response.json();
      showSearchResults(data);
    }
  
    function showSearchResults(data) {
      let searchResults = $("#searchResults");
      searchResults.empty();
      if (data.meals) {
        for (let i = 0; i < data.meals.length; i++) {
          searchResults.append(`
            <div class="col-md-3">
              <div class="homeMeals position-relative rounded-2 text-center">
                <div class="overlay d-flex justify-content-center align-items-center">
                  <h3>${data.meals[i].strMeal}</h3>
                </div>
                <img src="${data.meals[i].strMealThumb}" class="w-100" data-id="${data.meals[i].idMeal}" alt="...">
              </div>
            </div>
          `);
        }
      } else {
        searchResults.append(`<p class="text-white">No meals found</p>`);
      }
    }
  
    // Load categories.html when clicking on the categories list item
    $(".sideBar-ul ul #categories").on("click", function () {
      $(".loading-overlay").show();
      $("#rowData").load("categories.html", function () {
        $.getScript("js/categories.js", function () {
          $(".loading-overlay").hide();
        });
      });
    });
  
    // Load area.html when clicking on the area list item
    $(".sideBar-ul ul #area").on("click", function () {
      $(".loading-overlay").show();
      $("#rowData").load("areas.html", function () {
        $.getScript("js/area.js", function () {
          $(".loading-overlay").hide();
        });
      });
    });
  
    // Load ingredients.html when clicking on the ingredients list item
    $(".sideBar-ul ul #ingredients").on("click", function () {
      $(".loading-overlay").show();
      $("#rowData").load("ingredients.html", function () {
        $.getScript("js/ingredients.js", function () {
          $(".loading-overlay").hide();
        });
      });
    });
  
    // Load contact.html when clicking on the contact list item
    $(".sideBar-ul ul #contact").on("click", function () {
      $("#rowData").load("contact.html", function () {
        $.getScript("js/contact.js", function () {});
      });
    });
  
    // Add click event to logo to get back to the main default page
    $("#logo").on("click", function () {
      $(".loading-overlay").show();
      getData();
    });
  });