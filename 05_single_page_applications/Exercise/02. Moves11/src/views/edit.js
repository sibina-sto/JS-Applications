import { html } from "../lib.js";
import { getMovieById, editMovie } from "../api/data.js";
import { createSubmitHandler } from "../util.js";

const editTemplate = (movie, onEdit) => html`
      <section id="edit-movie" class="view-section">
        <form @submit=${onEdit} class="text-center border border-light p-5" action="" method="">
          <h1>Edit Movie</h1>
          <div class="form-group">
            <label for="title">Movie Title</label>
            <input
              id="title"
              type="text"
              class="form-control"
              placeholder="Movie Title"
              .value="${movie.title}"
              name="title"
            />
          </div>
          <div class="form-group">
            <label for="description">Movie Description</label>
            <textarea
              class="form-control"
              placeholder="Movie Description..."
              name="description"
            >${movie.title}</textarea>
          </div>
          <div class="form-group">
            <label for="imageUrl">Image url</label>
            <input
              id="imageUrl"
              type="text"
              class="form-control"
              placeholder="Image Url"
              .value="${movie.description}"
              name="img"
            />
          </div>
          <button type="submit" class="btn btn-primary">Submit</button>
        </form>
      </section>`;

export async function showEdit(ctx) {
    const id = ctx.params.id;
    const movie = await getMovieById(id);

    ctx.render(editTemplate(movie, createSubmitHandler(onEdit)));


    async function onEdit({title, description, img}, form) {
        if ([title, description, img].some(e => e == '')) {
            return alert('All fields are required!');
        }

        
        await editMovie({
            title,
            description,
            img
        }, id);
        form.reset();
        ctx.page.redirect('/' + id)
    }
}