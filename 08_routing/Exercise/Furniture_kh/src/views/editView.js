import { onDetails, onUpdate } from "../api.js";
import { html } from "../../node_modules/lit-html/lit-html.js";

const editTemp = (context) => html`
  <div class="row space-top">
    <div class="col-md-12">
      <h1>Edit Furniture</h1>
      <p>Please fill all fields.</p>
    </div>
  </div>
  <form @submit=${(e) => edit(e, context)}>
    <div class="row space-top">
      <div class="col-md-4">
        <div class="form-group">
          <label class="form-control-label" for="new-make">Make</label>
          <input
            class="form-control"
            id="new-make"
            type="text"
            name="make"
            value=${context.content.make}
          />
        </div>
        <div class="form-group has-success">
          <label class="form-control-label" for="new-model">Model</label>
          <input
            class="form-control"
            id="new-model"
            type="text"
            name="model"
            value=${context.content.model}
          />
        </div>
        <div class="form-group has-danger">
          <label class="form-control-label" for="new-year">Year</label>
          <input
            class="form-control"
            id="new-year"
            type="number"
            name="year"
            value=${context.content.year}
          />
        </div>
        <div class="form-group">
          <label class="form-control-label" for="new-description"
            >Description</label
          >
          <input
            class="form-control"
            id="new-description"
            type="text"
            name="description"
            value=${context.content.description}
          />
        </div>
      </div>
      <div class="col-md-4">
        <div class="form-group">
          <label class="form-control-label" for="new-price">Price</label>
          <input
            class="form-control"
            id="new-price"
            type="number"
            name="price"
            value=${context.content.price}
          />
        </div>
        <div class="form-group">
          <label class="form-control-label" for="new-image">Image</label>
          <input
            class="form-control"
            id="new-image"
            type="text"
            name="img"
            value=${context.content.img}
          />
        </div>
        <div class="form-group">
          <label class="form-control-label" for="new-material"
            >Material (optional)</label
          >
          <input
            class="form-control"
            id="new-material"
            type="text"
            name="material"
            value=${context.content.material}
          />
        </div>
        <input type="submit" class="btn btn-info" value="Edit" />
      </div>
    </div>
  </form>
`;

export async function editView(ctx, context) {
  context.content = await onDetails(ctx.params.id);
  context.render(editTemp(context), context.container);

  context.container.querySelectorAll("input.form-control").forEach((i) =>
    i.addEventListener("blur", () => {
      if (context.isValidInput(i)) {
        i.className = "form-control is-valid";
      } else {
        i.className = "form-control is-invalid";
      }
    })
  );
}

async function edit(ev, context) {
  ev.preventDefault();
  let formData = new FormData(ev.target);
  let data = {
    make: formData.get("make"),
    model: formData.get("model"),
    year: formData.get("year"),
    description: formData.get("description"),
    price: formData.get("price"),
    img: formData.get("img"),
    material: formData.get("material"),
  };
  if (
    data.make.length <= 3 ||
    data.model.length <= 3 ||
    data.year < 1950 ||
    data.year > 2050 ||
    data.description.length <= 10 ||
    data.price <= 0 ||
    data.img.length == 0
  ) {
    return alert("Invalid input!");
  }

  await onUpdate(data, context.content._id);
  context.page.redirect(`/details/${context.content._id}`);
}
