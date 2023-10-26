import { onDetails } from "../api.js";
import { html } from "../../node_modules/lit-html/lit-html.js";

const detailsTemp = (content) => {
  let userData;
  if (sessionStorage.userData) {
    userData = JSON.parse(sessionStorage.userData);
  }

  return html`
    <div class="row space-top">
      <div class="col-md-12">
        <h1>Furniture Details</h1>
      </div>
    </div>
    <div class="row space-top">
      <div class="col-md-4">
        <div class="card text-white bg-primary">
          <div class="card-body">
            <img
              src=${content.img.startsWith(".")
                ? `../${content.img}`
                : `${content.img}`}
            />
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <p>Make: <span>${content.make}</span></p>
        <p>Model: <span>${content.model}</span></p>
        <p>Year: <span>${content.year}</span></p>
        <p>Description: <span>${content.description}</span></p>
        <p>Price: <span>${content.price} $</span></p>
        <p>Material: <span>${content.material}</span></p>
        ${userData !== undefined && userData._id == content._ownerId
          ? html`
              <div>
                <a href="/edit/${content._id}" class="btn btn-info">Edit</a>
                <a href="/delete/${content._id}" class="btn btn-red">Delete</a>
              </div>
            `
          : null}
      </div>
    </div>
  `;
};

export async function detailsView(ctx, context) {
  let content = await onDetails(ctx.params.id);
  context.render(detailsTemp(content), context.container);
}
