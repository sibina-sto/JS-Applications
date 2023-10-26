import { showHome } from "./home.js";

document.addEventListener("DOMContentLoaded", onLoad);
document.querySelector("a").addEventListener("click", onHomeClick);

function onLoad() {
  showHome();
}

function onHomeClick() {
  showHome();
}
