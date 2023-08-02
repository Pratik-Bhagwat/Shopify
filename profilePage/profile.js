// Retrieve user data from sessionStorage and allUsersData from localStorage
let userData = JSON.parse(sessionStorage.getItem("loggedInUser"));
let allUsersData = JSON.parse(localStorage.getItem("usersArray")) || []; // Initialize as an empty array if no data is present

// Get references to the input fields and buttons
const firstName = document.querySelector("#firstName");
const lastName = document.querySelector("#lastName");
const saveInfoBtn = document.querySelector("#saveBtn");
const oldPassword = document.querySelector("#oldPassword");
const newPassword = document.querySelector("#newPassword");
const confirmPassword = document.querySelector("#confirmPassword");
const changePasswordBtn = document.querySelector("#changePassword");
const logoutBtn = document.querySelector("#logoutBtn");

// Display user data if available in sessionStorage
if (userData) {
  firstName.value = userData.firstName;
  lastName.value = userData.lastName;
}

// Save info button click event handler
saveInfoBtn.addEventListener("click", () => {
  const newFirstName = firstName.value.trim();
  const newLastName = lastName.value.trim();

  if (userData) {
    // Update the firstName and lastName in userData if they are different
    if (newFirstName !== userData.firstName) userData.firstName = newFirstName;
    if (newLastName !== userData.lastName) userData.lastName = newLastName;

    // Save updated userData in sessionStorage
    sessionStorage.setItem("loggedInUser", JSON.stringify(userData));

    // Find the current user's data in allUsersData and update it
    const currentUserIndex = allUsersData.findIndex((user) => {
      return user.email === userData.email; // Use a unique identifier like email for finding the user
    });

    if (currentUserIndex !== -1) {
      // Update the user's data in allUsersData
      allUsersData[currentUserIndex].firstName = newFirstName;
      allUsersData[currentUserIndex].lastName = newLastName;

      // Save updated allUsersData to localStorage
      localStorage.setItem("usersArray", JSON.stringify(allUsersData));
      alert("Your data is successfully saved");
    }
  }
});

// Change password button click event handler
changePasswordBtn.addEventListener("click", () => {
  if (userData) {
    // Check if the entered old password matches the user's current password
    if (oldPassword.value.trim() === userData.password) {
      // Check if the new password is different from the old password
      if (oldPassword.value.trim() !== newPassword.value.trim()) {
        // Check if the new password and confirm password match
        if (newPassword.value.trim() === confirmPassword.value.trim()) {
          // Update the user's password in userData
          userData.password = newPassword.value.trim();
          userData.confirmPassword = confirmPassword.value.trim();

          // Save updated userData in sessionStorage
          sessionStorage.setItem("loggedInUser", JSON.stringify(userData));

          // Find the current user's data in allUsersData and update it
          const currentUserIndex = allUsersData.findIndex((user) => {
            return user.email === userData.email; // Use a unique identifier like email for finding the user
          });

          if (currentUserIndex !== -1) {
            // Update the user's password in allUsersData
            allUsersData[currentUserIndex].password = newPassword.value.trim();
            allUsersData[currentUserIndex].confirmPassword =
              newPassword.value.trim();

            // Save updated allUsersData to localStorage
            localStorage.setItem("usersArray", JSON.stringify(allUsersData));
            alert("Your password is successfully updated");
          }
        } else {
          alert("Confirm password does not match with the new password");
        }
      } else {
        alert("Please do not enter the new password as the old password");
      }
    } else {
      alert("Old password is wrong!!");
    }
  }
});

// Logout btn click event function
logoutBtn.addEventListener("click", () => {
  window.location.href = "../index.html";
});
