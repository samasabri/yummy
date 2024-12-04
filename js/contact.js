// Regex patterns
let nameRegex = /^[a-zA-Z\s]+$/;
let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
let phoneRegex = /^[0-9]{11}$/;
let ageRegex = /^[0-9]{1,3}$/;
let passwordRegex =
  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;

function validation() {
  let name = document.getElementById("name").value;
  let email = document.getElementById("email").value;
  let phone = document.getElementById("phone").value;
  let age = document.getElementById("age").value;
  let password = document.getElementById("password").value;
  let confirmPassword = document.getElementById("confirmPassword").value;

  let isValid = true;
  let errorMessage = "";

  if (!nameRegex.test(name)) {
    isValid = false;
    errorMessage += "Invalid Name. Only letters and spaces are allowed.\n";
  }
  if (!emailRegex.test(email)) {
    isValid = false;
    errorMessage += "Invalid Email.\n";
  }
  if (!phoneRegex.test(phone)) {
    isValid = false;
    errorMessage += "Invalid Phone. It should be a 10-digit number.\n";
  }
  if (!ageRegex.test(age)) {
    isValid = false;
    errorMessage +=
      "Invalid Age. It should be a number between 1 and 3 digits.\n";
  }
  if (!passwordRegex.test(password)) {
    isValid = false;
    errorMessage +=
      "Invalid Password. It should be 8-15 characters long, including at least one uppercase letter, one lowercase letter, one number, and one special character.\n";
  }
  if (password !== confirmPassword) {
    isValid = false;
    errorMessage += "Passwords do not match.\n";
  }

  if (isValid) {
    alert("Form Submitted Successfully");
    return true;
  } else {
    alert(errorMessage);
    return false;
  }
}

$("#submit").click(function (event) {
  event.preventDefault(); // Prevent the default form submission
  validation();
});