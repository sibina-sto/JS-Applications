import { html } from "../lib.js"
import { createSubmitHandler } from "../util.js";
import { createMovie } from "../api/data.js";

const createTemplate = (onSubmit) => html`
      <section id="add-movie" class="view-section">
        <form @submit=${onSubmit}
          id="add-movie-form"
          class="text-center border border-light p-5"
          action=""
          method=""
        >
          <h1>Add Movie</h1>
          <div class="form-group">
            <label for="title">Movie Title</label>
            <input
              id="title"
              type="text"
              class="form-control"
              placeholder="Title"
              name="title"
              value=""
            />
          </div>
          <div class="form-group">
            <label for="description">Movie Description</label>
            <textarea
              class="form-control"
              placeholder="Description"
              name="description"
            ></textarea>
          </div>
          <div class="form-group">
            <label for="imageUrl">Image url</label>
            <input
              id="imageUrl"
              type="text"
              class="form-control"
              placeholder="Image Url"
              name="img"
              value=""
            />
          </div>
          <button type="submit" class="btn btn-primary">Submit</button>
        </form>
      </section>`;

export async function showCreate(ctx) {
    ctx.render(createTemplate(createSubmitHandler(onCreate)))

    async function onCreate({title, description, img}, form) {
        if ([title, description, img].some(e => e == '')) {
            return alert('All fields are required!');
        }

        
        await createMovie({
            title,
            description,
            img
        });
        form.reset();
        ctx.page.redirect('/');
    }
}