import { html } from "../node_modules/lit-html/lit-html.js";

export const table = (onLoad) => html`
    <button id="loadBooks" @click=${onLoad}">LOAD ALL BOOKS</button>
    <table>
        <thead>
        <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Action</th>
        </tr>
        </thead>
        <tbody>
        </tbody>
    </table>`;

export const bookTemplate = (onEdit, onDelete, book) => html` <tr
  data-id=${book.id}
>
  <td>${book.title}</td>
  <td>${book.author}</td>
  <td>
    <button @click=${() => onEdit(book)}>Edit</button>
    <button @click=${() => onDelete(book)}>Delete</button>
  </td>
</tr>`;
