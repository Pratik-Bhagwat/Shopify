const firstName = document.querySelector("#firstName");
const lastName = document.querySelector("#lastName");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const confirmPassword = document.querySelector("#confirmPassword");
const signupBtn = document.querySelector("#signupBtn");

function saveUser(firstName, lastName, email, password, confirmPassword) {
  const userObj = {
    firstName: firstName,
    lastName: lastName,
    email: email,
    password: password,
    confirmPassword: confirmPassword,
  };

  // here we are getting the userArray from the localStorage
  // and converting it to its orginal form.
  let usersArray = JSON.parse(localStorage.getItem("usersArray"));

  if (usersArray === null) {
    usersArray = [];
  }
  // if the userArray is not empty or undefined that means
  // we just need to push the userObj into the uesr array and save it in localStorage

  usersArray.push(userObj);
  localStorage.setItem("usersArray", JSON.stringify(usersArray));

  // we will store the user details in the session storage as well
  sessionStorage.setItem("loggedInUser", JSON.stringify(userObj));
}

function checkUserExists(email) {
  // here we are getting the userArray from the localStorage
  // and converting it to its orginal form.
  const usersArray = JSON.parse(localStorage.getItem("usersArray"));

  const userObj = usersArray.find((user) => {
    if (user.email === email) return user;
  });

  //   if userObj is not undefined that means this user already exists.
  if (userObj != undefined) return true;
  //   else if userObj is undefined that means there no user with this email
  else return false;
}

signupBtn.addEventListener("click", (event) => {
  if (
    firstName.value.trim() === "" ||
    lastName.value.trim() === "" ||
    email.value.trim() === "" ||
    password.value.trim() === "" ||
    confirmPassword.value.trim() === ""
  ) {
    alert("All fields are necessary");
  }
  //   here we are checking if the password and confirm password is same or not
  else {
    if (password.value.trim() !== confirmPassword.value.trim()) {
      alert("the passwords dosen't match");
      password.value = "";
      confirmPassword.value = "";
    }
    // if the user already exists
    else {
      if (localStorage.getItem("usersArray")) {
        // if he user already exist we are giving an alret message
        if (checkUserExists(email.value)) {
          alert("user already exists with this email");
        }
        // else means this is a new user.
        else {
          saveUser(
            firstName.value,
            lastName.value,
            email.value,
            password.value,
            confirmPassword.value
          );
        }
      }
      // this else is for the first time
      else {
        saveUser(
          firstName.value,
          lastName.value,
          email.value,
          password.value,
          confirmPassword.value
        );
        alert("User sucessfully signed up");
        window.location.href = "/loginPage/login.html";
      }
    }
  }
});
