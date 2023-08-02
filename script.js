const loginBtn = document.querySelector(".login-btn");
const signupBtn = document.querySelector(".signup-btn");

loginBtn.addEventListener("click", () => {
  window.location.href = "./loginPage/login.html";
});
signupBtn.addEventListener("click", () => {
  window.location.href = "./signupPage/signup.html";
});
