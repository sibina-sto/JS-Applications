import { getAllFurniture } from '../api/data.js';
import { html, until } from '../lib.js';

const furnitureTemplate = x => html`
    <div class="col-md-4">
        <div class="card text-white bg-primary">
            <div class="card-body">
                <img src=${x.img} />
                <p>${x.description}</p>
                <footer>
                    <p>Price: <span>${x.price} $</span></p>
                </footer>
                <div>
                    <a href="/details/${x._id}" class="btn btn-info">Details</a>
                </div>
            </div>
        </div>
    </div>
`;

const catalogTemplate = promise => html`
    <div class="row space-top">
        <div class="col-md-12">
            <h1>Welcome to Furniture System</h1>
            <p>Select furniture from the catalog to view details.</p>
        </div>
    </div>
    <div class="row space-top">
        <!-- furniture goes here -->
        ${until(promise(), html`<p>Loading furniture...</p>`)}
    </div>
`;

let ctx;

export async function homeView(inCtx) {
    ctx = inCtx;
    ctx.updateUserNav();
    ctx.render(catalogTemplate(loadData));
}

async function loadData() {
    const data = await getAllFurniture();
    return data.map(furnitureTemplate);
}
