const loginBtn = document.querySelector(".login-btn");
const signupBtn = document.querySelector(".signup-btn");
const shopifyLogo = document.querySelector(".nav-left");

loginBtn.addEventListener("click", () => {
  window.location.href = "./loginPage/";
});
signupBtn.addEventListener("click", () => {
  window.location.href = "./signupPage/";
});

shopifyLogo.addEventListener("click", () => {
  location.href = "./index.html";
});
