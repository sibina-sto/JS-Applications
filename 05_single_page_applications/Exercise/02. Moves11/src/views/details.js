import { getLikes, getMovieById, deleteById } from "../api/data.js";
import { html, nothing } from "../lib.js";

const detailsTemplate = (movie, user, isOwner, likes, onDelete) => html`
      <section id="movie-example" class="view-section">
        <div class="container">
          <div class="row bg-light text-dark">
            <h1>Movie title: ${movie.title}</h1>

            <div class="col-md-8">
              <img
                class="img-thumbnail"
                src="${movie.img}"
                alt="Movie"
              />
            </div>
            <div class="col-md-4 text-center">
              <h3 class="my-3">Movie Description</h3>
              <p>
                ${movie.description}
              </p>
                ${isOwner ? html`<a @click=${onDelete} class="btn btn-danger" href="javascript:void(0)">Delete</a>
                                 <a class="btn btn-warning" href="edit/${movie._id}">Edit</a>}` : 
                            html`${ user ? html`<a class="btn btn-primary" href="#">Like</a>` : nothing}`}
              <span class="enrolled-span">Liked ${likes}</span>
            </div>
          </div>
        </div>
      </section>`;

export async function showDetails(ctx) {
    const user = ctx.user;
    const id = ctx.params.id;

    const movie = await getMovieById(id);
    const isOwner = user && ctx.user._id == movie._ownerId

    const likes = await getLikes(id)
    ctx.render(detailsTemplate(movie, user, isOwner, likes, onDelete))

    async function onDelete() {
        await deleteById(id);
        ctx.page.redirect('/');
    }
}