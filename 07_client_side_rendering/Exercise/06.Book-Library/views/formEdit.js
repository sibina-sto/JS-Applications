import { html } from "../node_modules/lit-html/lit-html.js";

export const formEdit = (book, onSubmit) => html`
  <form id="edit-form" @submit=${onSubmit}>
    <input type="hidden" name="id" value=${book.id} />
    <h3>Edit book</h3>
    <label>TITLE</label>
    <input
      type="text"
      name="title"
      placeholder="Title..."
      value=${book.title}
    />
    <label>AUTHOR</label>
    <input
      type="text"
      name="author"
      placeholder="Author..."
      value=${book.author}
    />
    <input type="submit" value="Save" />
  </form>
`;
