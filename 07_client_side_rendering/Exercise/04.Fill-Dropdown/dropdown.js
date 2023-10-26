import { getAllItems } from "./api/data.js";
import { html, render } from "./node_modules/lit-html/lit-html.js";

const items = Object.values(await getAllItems());

const template = (item) =>
  html`<option value=${item._id}>${item.text}</option>`;

start();
function start() {
  render(items.map(template), document.getElementById("menu"));
}
