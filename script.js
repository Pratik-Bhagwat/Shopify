const loginBtn = document.querySelector(".login-btn");
const signupBtn = document.querySelector(".signup-btn");

loginBtn.addEventListener("click", () => {
  window.location.href = "./loginPage";
});
signupBtn.addEventListener("click", () => {
  window.location.href = "./signupPage";
});
