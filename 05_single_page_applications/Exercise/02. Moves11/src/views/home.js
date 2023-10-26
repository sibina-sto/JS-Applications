import { getAll } from "../api/data.js";
import { html, nothing } from "../lib.js"

const homeTemplate = (movies, user) => html`
    <section id="home-page" class="view-section">
        <div class="jumbotron jumbotron-fluid text-light" style="background-color: #343a40">
            <img src="https://slicksmovieblog.files.wordpress.com/2014/08/cropped-movie-banner-e1408372575210.jpg"
                class="img-fluid" alt="Responsive image" style="width: 150%; height: 200px" />
            <h1 class="display-4">Movies</h1>
            <p class="lead">
                Unlimited movies, TV shows, and more. Watch anywhere. Cancel
                anytime.
            </p>
        </div>
    
        <h1 class="text-center">Movies</h1>
    
        ${user ? html`<section id="add-movie-button" class="user">
            <a href="/create" class="btn btn-warning">Add Movie</a>
        </section>` : nothing}
    
        <section id="movie">
            <div class="mt-3">
                <div class="row d-flex d-wrap">
                    <ul id="movies-list" class="card-deck d-flex justify-content-center">
                        ${movies.length > 0 ? movies.map(movieCardTemplate) : nothing }
                    </ul>
                </div>
            </div>
        </section>
    </section>`;

const movieCardTemplate = (movies) => html`<li><div class="card">
        <img class="card-img-top" src="${movies.img}">
        <span class="badge">${movies.title}</span>
        <span class="btn">        
            <a class="btn btn-info" href="/${movies._id}">Details</a>
</p></span>

</div></li>`;



export async function showHome(ctx) {
    const movies = await getAll();
    const user = ctx.user;
    ctx.render(homeTemplate(movies, user))
}