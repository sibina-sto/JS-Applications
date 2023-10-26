import { myFurniture } from '../api/data.js';
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

const myFurnitureTemplate = (data) => html`
  <div class="row space-top">
    <div class="col-md-12">
      <h1>My Furniture</h1>
      <p>This is a list of your publications.</p>
    </div>
  </div>
  <div class="row space-top">
    <!-- user furniture goes here -->
    ${data.map(furnitureTemplate)}
  </div>
`;

 export async function myFurnitureView(ctx) {
  const user = ctx.getUserData();
  const data = await myFurniture(user.id);
  ctx.updateUserNav();
  ctx.render(myFurnitureTemplate(data));
}

