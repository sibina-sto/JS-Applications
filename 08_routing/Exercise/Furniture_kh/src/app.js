import { render } from "../node_modules/lit-html/lit-html.js";
import page from "../node_modules/page/page.mjs";
import { catalogView } from "./views/catalogView.js";
import { createView } from "./views/createView.js";
import { loginView } from "./views/loginView.js";
import { registerView } from "./views/registerView.js";
import { myFurnitureView } from "./views/myFurnitureView.js";
import { onDelete, onLogout } from "./api.js";
import { detailsView } from "./views/detailsView.js";
import { editView } from "./views/editView.js";

const nav = document.querySelector("nav");
const container = document.querySelector("div.container");
const userNav = nav.querySelector("#user");
const guestNav = nav.querySelector("#guest");
const context = {
  container,
  render,
  page,
  updateNav,
  isValidInput,
};

updateNav();

page("/", "/catalog");
page("/catalog", () => catalogView(context));
page("/create", () => createView(context));
page("/login", () => loginView(context));
page("/register", () => registerView(context));
page("/myFurniture", () => myFurnitureView(context));
page("/details/:id", (ctx) => detailsView(ctx, context));
page("/edit/:id", (ctx) => editView(ctx, context));
page("/delete/:id", (ctx) => del(ctx));
page("/logout", logout);

page.start();

function updateNav() {
  if (sessionStorage.userData !== undefined) {
    userNav.style.display = "inline-block";
    guestNav.style.display = "none";
  } else {
    userNav.style.display = "none";
    guestNav.style.display = "inline-block";
  }
}

async function logout() {
  await onLogout();
  sessionStorage.removeItem("userData");
  page.redirect("/catalog");
  updateNav();
}

async function del(ctx) {
  if (confirm("Are you sure you want to delete this product?")) {
    await onDelete(ctx.params.id);
    page.redirect("/catalog");
  }
}

function isValidInput(input) {
  if (input.id == "new-make" && input.value.length <= 3) {
    // alert('Make must be at least 4 symbols!');
    return false;
  } else if (input.id == "new-model" && input.value.length <= 3) {
    // alert('Model must be at least 4 symbols!');
    return false;
  } else if (
    input.id == "new-year" &&
    (input.value < 1950 || input.value > 2050)
  ) {
    // alert('Year must be between 1950 and 2050!');
    return false;
  } else if (input.id == "new-description" && input.value.length <= 10) {
    // alert('Description must be at least 10 symbols!');
    return false;
  } else if (input.id == "new-price" && input.value <= 0) {
    // alert('Price must be a positive number!');
    return false;
  } else if (input.id == "new-image" && input.value.length == 0) {
    // alert('Image cannot be empty!');
    return false;
  }

  return true;
}
