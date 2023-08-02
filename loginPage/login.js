const email = document.querySelector("#email");
const password = document.querySelector("#password");
const loginBtn = document.querySelector("#loginBtn");

loginBtn.addEventListener("click", (event) => {
  event.preventDefault();
  // checking if all the fields were filled or not
  if (email.value.trim() === "" || password.value.trim() === "") {
    alert("all fields are necessary");
  }
  //   here we are checking if the user is exists in localstorage.
  else {
    let userArray = JSON.parse(localStorage.getItem("usersArray"));

    if (userArray) {
      // here we are checking if we have any user with this email
      let currentUser = userArray.find((user) => {
        if (user.email === email.value.trim()) return user;
      });

      //   if we have a user with this email in our localstorage.
      if (currentUser) {
        // then we will check if the password is matching or not.
        if (currentUser.password === password.value.trim()) {
          sessionStorage.setItem("loggedInUser", JSON.stringify(currentUser));
          window.location.href = "../shopPage/shop.html";
          alert("logged in successfully");
        }

        // if its not matched we show an alert.
        else {
          alert("incorrect password");
        }
      }

      // if the user not exisits in our localStorage then we will
      // show an alert message
      else {
        alert("there is no user with this email");
      }
    }
  }
});
