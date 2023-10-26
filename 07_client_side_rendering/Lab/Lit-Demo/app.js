import { html, render } from "https://unpkg.com/lit-html?module";
import { styleMap } from "https://unpkg.com/lit-html/directives/style-map.js?module";
import { classMap } from "https://unpkg.com/lit-html/directives/class-map.js?module";
import { repeat } from "https://unpkg.com/lit-html/directives/repeat.js?module";

// const tableRow = ({name, id}) => html `
// <tr>
//     <td>${name}</td>
//     <td><button @click=${onClick.bind(null,id)}>Highlight</button>
//     </td>

// </tr>`

const tableRow = (item, onClick) => html` <tr
  style=${styleMap(item.style || {})}
>
  <td class=${classMap(item.highlight || {})}>${item.name}</td>
  <td>
    ${item.canEdit
      ? html`<button>Edit</button
          ><button @click=${onClick.bind(null, item.id)}>Delete</button>`
      : null}
  </td>
</tr>`;

const data = [
  {
    name: "Peter",
    id: "asd1",
    canEdit: false,
    style: {
      color: "red",
      border: "1px solid black",
    },
  },
  {
    name: "Dani",
    id: "asd2",
    canEdit: true,
    highlight: {
      active: true,
      content: false,
    },
  },
  {
    name: "Viki",
    id: "asd3",
    canEdit: false,
  },
  {
    name: "Carnas",
    id: "asd4",
    canEdit: false,
  },
];

const table = (items, onClick) => html` <table>
  ${items.map((i) => tableRow(i, onClick))}
</table>`;

// const table = (items, onClick) => html`
// <table>
//    ${repeat(items, i => i.id, i => tableRow(i, onClick))}
// </table>`

const root = document.querySelector("main");
update();

function onClick(id) {
  const index = data.findIndex((i) => i.id == id);
  data.splice(index, 1);
  update();
}

function update() {
  render(table(data, onClick), root);
}

// const timer = (time) => html`<p>The time is ${time}</p><p>Have a nice day</p>`;
// const message = () => html`<p>Static message</p>`;

// const root = document.querySelector("main");

// function show() {
//     render(message(), root)
// }

// function update() {
//     render(timer(new Date()), root)
// }

// document.querySelector("button").addEventListener("click", update)
// setInterval(update, 1000);

// window.update = update;
// window.show = show;

// const p = document.createElement('p');
// p.textContent = "Hello, World";

// function createP(name){
//     return html `<p>Hello ${name}</p>`;
// }

// const p = (name, className) => html `<p class="${className}">Hello ${name}</p>`;
// const input = (disabled) => html `<input ?disabled=${disabled}>`

// render(p("World", "content"), document.querySelector("main"));
// render(p("Petro", "otherContent"), document.querySelector("nav"));
// render(input(false), document.querySelector("nav"));
