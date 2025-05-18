//Burger button functinality
const burgerBtn = document.getElementById("burger-btn");
const navBar = document.getElementById("nav-links-header");
const gripLine = document.getElementById("grip-line");
const xMark = document.getElementById("x-mark");

burgerBtn.addEventListener("click", () => {
  navBar.classList.toggle("show");
  gripLine.classList.toggle("hidden");
  xMark.classList.toggle("hidden");
});
