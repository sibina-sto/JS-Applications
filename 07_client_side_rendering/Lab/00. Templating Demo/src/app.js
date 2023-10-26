// import { render } from "./template.js";

// document.getElementById("navigation").addEventListener("click", onClick);
// let username = "Peter";

// let items = ["Product 1", "Product 2", "Product 3", "Product 4"];

// const context = {
//   username,
//   items,
// };

// let views = {
//   "home-link": "<h2>Home Page</h2><p>Welcome, %%username%%</p>",
//   "catalog-link": "<h2>Catalog Page</h2><ul>%%items%%</ul>",
//   "about-link": "<h2>About Page<h2>",
// };

// function onClick(e) {
//   if (e.target.tagName == "A") {
//     const view = views[e.target.id];
//     if (view !== undefined) {
//       render(view, context);
//     }
//   }
// }


import { render } from "./template.js";

const username = "Peter<scripts>alert('hacked')</scripts>";
const items = [
  "Product 1", 
  "Product 2", 
  "Product 3"
  ];

const ctx = {
  username,
  items1: await render('item', { name: 'Product1' }),
  items2: await render('item', { name: 'Product2' }),
  items3: await render('item', { name: 'Product3' })
};

const views = {
  "home-link": "home",
  "catalog-link": "catalog",
  "about-link": "about"
};


document.querySelector("nav").addEventListener("click", async (event) => {
  if (event.target.tagName == "A") {
    const view = views[event.target.id];
    if (view !== undefined) {
      document.querySelector("main").innerHTML = await render(view, ctx);
      
    }
  }
});


