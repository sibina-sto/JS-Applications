import { deleteFurniture, getFurnitureDetails } from '../api/data.js';
import { html, until } from '../lib.js';

const furnitureTemplate = (x, event) => html`
    <div class="col-md-4">
        <div class="card text-white bg-primary">
            <div class="card-body">
                <img src=${x.img.replace('.', '')} />
            </div>
        </div>
    </div>
    <div class="col-md-4">
        <p>Make: <span>${x.make}</span></p>
        <p>Model: <span>${x.model}</span></p>
        <p>Year: <span>${x.year}</span></p>
        <p>Description: <span>${x.description}}</span></p>
        <p>Price: <span>${x.price}</span></p>
        <p>Material: <span>${x.material}</span></p>
        <div style=${x.isOwner ? 'display: block;' : 'display: none;'}>
            <a href="/edit/${x._id}" class="btn btn-info">Edit</a>
            <a href="javascript:void(0)" class="btn btn-red" @click=${event}>Delete</a>
        </div>
    </div>
`;

const detailsTemplate = (promise, ctx) => html`
    <div class="row space-top">
        <div class="col-md-12">
            <h1>Furniture Details</h1>
        </div>
    </div>
    <div class="row space-top">${until(promise(ctx), html`<p>Loading details...</p>`)}</div>
`;

export function detailsView(ctx) {
    ctx.updateUserNav();
    ctx.render(detailsTemplate(loadFurniture, ctx));
}

async function loadFurniture(ctx) {
    const user = ctx.getUserData();
    const data = await getFurnitureDetails(ctx.params.id);
    if (user) {
        data.isOwner = user.id === data._ownerId;
    }
    return furnitureTemplate(data, onDelete);
    // on click event to delete the current furniture
    async function onDelete() {
        await deleteFurniture(data._id);
        ctx.page.redirect('/');
    }
}
