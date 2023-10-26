import { getFurnitureDetails, updateFurniture } from '../api/data.js';
import { html } from '/lib.js';

const editTemplate = (x, onSubmit) => html`
  <div class="row space-top">
    <div class="col-md-12">
      <h1>Edit Furniture</h1>
      <p>Please fill all fields.</p>
    </div>
  </div>
  <form @submit=${onSubmit}>
    <div class="row space-top">
      <div class="col-md-4">
        <div class="form-group">
          <label class="form-control-label" for="new-make">Make</label>
          <input class="form-control" id="new-make" type="text" name="make" value=${x.make} />
        </div>
        <div class="form-group has-success">
          <label class="form-control-label" for="new-model">Model</label>
          <input class="form-control is-valid" id="new-model" type="text" name="model" value=${x.model} />
        </div>
        <div class="form-group has-danger">
          <label class="form-control-label" for="new-year">Year</label>
          <input class="form-control is-invalid" id="new-year" type="number" name="year" value=${x.year} />
        </div>
        <div class="form-group">
          <label class="form-control-label" for="new-description">Description</label>
          <input class="form-control" id="new-description" type="text" name="description" value=${x.description} />
        </div>
      </div>
      <div class="col-md-4">
        <div class="form-group">
          <label class="form-control-label" for="new-price">Price</label>
          <input class="form-control" id="new-price" type="number" name="price" value=${x.price} />
        </div>
        <div class="form-group">
          <label class="form-control-label" for="new-image">Image</label>
          <input class="form-control" id="new-image" type="text" name="img" value=${x.img} />
        </div>
        <div class="form-group">
          <label class="form-control-label" for="new-material">Material (optional)</label>
          <input class="form-control" id="new-material" type="text" name="material" value=${x.material} />
        </div>
        <input type="submit" class="btn btn-info" value="Edit" />
      </div>
    </div>
  </form>
`;
let outterCtx;

export async function showEdit(ctx) {
  outterCtx = ctx;
  const data = await getFurnitureDetails(ctx.params.id);
  ctx.render(editTemplate(data, onSubmit));
}

async function onSubmit(ev) {
  ev.preventDefault();
  const formData = new FormData(ev.target);
  const { make, model, year, description, img, material, price } = Object.fromEntries(formData);
  if (make.length < 4 || model.length < 4) {
    return;
  }
  if (+year < 1950 || +year > 2050) {
    return;
  }
  if (description.length < 10) {
    return;
  }
  if (+price < 0) {
    return;
  }
  if (!img.includes('http')) {
    return;
  }
  const data = { make, model, year, description, img, material, price };
  await updateFurniture(outterCtx.params.id, data);
  outterCtx.page.redirect(`/`);
}
