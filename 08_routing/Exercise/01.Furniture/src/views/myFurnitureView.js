import { getMyFurnitures } from "../api.js";
import { html } from "../../node_modules/lit-html/lit-html.js";

const myFurnitureTemp = (content) => html`
  <div class="row space-top">
    <div class="col-md-12">
      <h1>My Furniture</h1>
      <p>This is a list of your publications.</p>
    </div>
  </div>
  <div class="row space-top">
    ${content.map(
      (c) => html`
        <div class="col-md-4">
          <div class="card text-white bg-primary">
            <div class="card-body">
              <img src=${c.img} />
              <p>${c.description}</p>
              <footer>
                <p>Price: <span>${c.price} $</span></p>
              </footer>
              <div>
                <a href="/details/${c._id}" class="btn btn-info">Details</a>
              </div>
            </div>
          </div>
        </div>
      `
    )}
  </div>
`;

export async function myFurnitureView(context) {
  let user = JSON.parse(sessionStorage.userData);
  let myFurnitures = await getMyFurnitures(user._id);
  context.render(myFurnitureTemp(myFurnitures), context.container);
}
