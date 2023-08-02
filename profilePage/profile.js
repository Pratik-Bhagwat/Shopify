// Retrieve user data from sessionStorage and allUsersData from localStorage
const userData = JSON.parse(sessionStorage.getItem("loggedInUser"));
const allUsersData = JSON.parse(localStorage.getItem("usersArray"));

console.log(userData);
console.log(allUsersData);

// Get references to the input fields and buttons
const firstName = document.querySelector("#firstName");
const lastName = document.querySelector("#lastName");
const saveInfoBtn = document.querySelector("#saveBtn");
const oldPassword = document.querySelector("#oldPassword");
const newPassword = document.querySelector("#newPassword");
const confirmPassword = document.querySelector("#confirmPassword");
const changePasswordBtn = document.querySelector("#changePassword");

// Display user data if available in sessionStorage
if (userData) {
  firstName.value = userData.firstName;
  lastName.value = userData.lastName;
}

console.log(firstName.value);
console.log(lastName.value);
// Save info button click event handler
saveInfoBtn.addEventListener("click", () => {
  const newFirstName = firstName.value.trim();
  const newLastName = lastName.value.trim();

  // Find the current user's data in allUsersData
  const currentUserPrevData = allUsersData.find((user) => {
    return user.firstName === newFirstName && user.lastName === newLastName;
  });

  if (userData) {
    // Update the firstName and lastName in userData if they are different
    if (newFirstName !== userData.firstName) userData.firstName = newFirstName;
    if (newLastName !== userData.lastName) userData.lastName = newLastName;

    // Save updated userData in sessionStorage
    sessionStorage.setItem("loggedInUser", JSON.stringify(userData));

    // Create an updated user object to push to allUsersData
    const updatedUserObj = {
      firstName: newFirstName,
      lastName: newLastName,
      email: currentUserPrevData.email,
      password: currentUserPrevData.password,
    };

    // Remove the current user's data from allUsersData
    const indexToRemove = allUsersData.indexOf(currentUserPrevData);
    if (indexToRemove !== -1) {
      allUsersData.splice(indexToRemove, 1);
    }

    // Push the updated user object to allUsersData
    allUsersData.push(updatedUserObj);

    // Save updated allUsersData to localStorage
    localStorage.setItem("usersArray", JSON.stringify(allUsersData));
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

          // Save updated userData in sessionStorage
          sessionStorage.setItem("loggedInUser", JSON.stringify(userData));

          // Create an updated user object to push to allUsersData
          const updatedUserObj = {
            firstName: currentUserPrevData.firstName,
            lastName: currentUserPrevData.lastName,
            email: currentUserPrevData.email,
            password: newPassword.value.trim(),
          };

          // Remove the current user's data from allUsersData
          const indexToRemove = allUsersData.indexOf(currentUserPrevData);
          if (indexToRemove !== -1) {
            allUsersData.splice(indexToRemove, 1);
          }

          // Push the updated user object to allUsersData
          allUsersData.push(updatedUserObj);

          // Save updated allUsersData to localStorage
          localStorage.setItem("usersArray", JSON.stringify(allUsersData));
        } else {
          alert("Confirm password does not match with new password");
        }
      } else {
        alert("Please do not enter the new password as the old password");
      }
    } else {
      alert("Old password is wrong!!");
    }
  }
});
