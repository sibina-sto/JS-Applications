import { getAllFurnitures } from "../api.js";
import { html } from "../../node_modules/lit-html/lit-html.js";

const catalogTemp = (content) => html`
  <div class="row space-top">
    <div class="col-md-12">
      <h1>Welcome to Furniture System</h1>
      <p>Select furniture from the catalog to view details.</p>
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

export async function catalogView(context) {
  let allFurnitures = await getAllFurnitures();
  context.render(catalogTemp(allFurnitures), context.container);
}
