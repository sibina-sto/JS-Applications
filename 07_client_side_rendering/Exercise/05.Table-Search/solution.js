import { getAllRows } from "./api/data.js";
import { html, render } from "./node_modules/lit-html/lit-html.js";
import { repeat } from "./node_modules/lit-html/directives/repeat.js";
import { classMap } from "./node_modules/lit-html/directives/class-map.js";

const rows = Object.values(await getAllRows());
const rowTemplate = (row) => html` <tr
  class=${classMap({ select: row.select })}
>
  <td>${row.firstName} ${row.lastName}</td>
  <td>${row.email}</td>
  <td>${row.course}</td>
</tr>`;
console.log(rows);

start();

function start() {
  update();
}

function update() {
  render(
    repeat(rows, (r) => r._id, rowTemplate),
    document.querySelector("tbody")
  );
}

document.querySelector("#searchBtn").addEventListener("click", onClick);

function onClick() {
  const searchValue = document
    .getElementById("searchField")
    .value.toLowerCase();
  rows.forEach((t) => {
    t.select = Object.values(t).some(
      (v) => typeof v === "string" && v.toLowerCase().includes(searchValue)
    );
  });
  update();
}
