import { render } from "./node_modules/lit-html/lit-html.js";
import { repeat } from "./node_modules/lit-html/directives/repeat.js";

import { createBook, deleteBook, editBook, getAllBooks } from "./api/data.js";
import { formEdit } from "./views/formEdit.js";
import { formCreate } from "./views/formCreate.js";
import { table, bookTemplate } from "./views/table.js";

let books = Object.entries(await getAllBooks()).map((e) =>
  Object.assign({ id: e[0] }, e[1])
);

start();

function start() {
  render([table(update), formCreate(onCreate)], document.querySelector("body"));
}

function update() {
  render(
    repeat(books, (book) => book.id, bookTemplate.bind(null, onEdit, onDelete)),
    document.querySelector("tbody")
  );
}

function onEdit(book) {
  render(
    [table(update), formEdit(book, onEditSubmit)],
    document.querySelector("body")
  );
}

function onDelete(id) {
  deleteBook(id);
  books = books.filter((b) => b.id !== id);
  update();
}

async function onCreate(event) {
  event.preventDefault();
  const formData = new FormData(event.target);
  const data = Object.fromEntries(formData);
  if (Object.values(data).some((f) => f === "")) {
    alert("All fields are required!");
    return;
  }

  const newBook = await createBook(data);
  books.push(newBook);
  event.target.reset();
  update();
}

async function onEditSubmit(event) {
  event.preventDefault();
  const formData = new FormData(event.target);
  const data = Object.fromEntries(formData);
  if (Object.values(data).some((f) => f === "")) {
    alert("All fields are required!");
    return;
  }
  await editBook(data);
  const book = books.filter((b) => b.id === data.id)[0];
  if (book) {
    book.title = data.title;
    book.author = data.author;
  }
  event.target.reset();
  start();
  update();
}
