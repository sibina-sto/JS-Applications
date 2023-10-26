import { createFurniture } from '../api/data.js';
import { html } from '../lib.js';

const createTemplate = event => html` <div class="row space-top">
    <div class="col-md-12">
      <h1>Create New Furniture</h1>
      <p>Please fill all fields.</p>
    </div>
  </div>
  <form @submit=${event}>
    <div class="row space-top">
      <div class="col-md-4">
        <div class="form-group">
          <label class="form-control-label" for="new-make">Make</label>
          <input class="form-control valid" id="new-make" type="text" name="make" />
        </div>
        <div class="form-group has-success">
          <label class="form-control-label" for="new-model">Model</label>
          <input class="form-control is-valid" id="new-model" type="text" name="model" />
        </div>
        <div class="form-group has-danger">
          <label class="form-control-label" for="new-year">Year</label>
          <input class="form-control is-invalid" id="new-year" type="number" name="year" />
        </div>
        <div class="form-group">
          <label class="form-control-label" for="new-description">Description</label>
          <input class="form-control" id="new-description" type="text" name="description" />
        </div>
      </div>
      <div class="col-md-4">
        <div class="form-group">
          <label class="form-control-label" for="new-price">Price</label>
          <input class="form-control" id="new-price" type="number" name="price" />
        </div>
        <div class="form-group">
          <label class="form-control-label" for="new-image">Image</label>
          <input class="form-control" id="new-image" type="text" name="img" />
        </div>
        <div class="form-group">
          <label class="form-control-label" for="new-material">Material (optional)</label>
          <input class="form-control" id="new-material" type="text" name="material" />
        </div>
        <input type="submit" class="btn btn-primary" value="Create" />
      </div>
    </div>
  </form>`;

export function createView(ctx) {
  ctx.updateUserNav();
  ctx.render(createTemplate(onSubmit.bind(null, ctx)));
}

async function onSubmit(ctx, ev) {
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
  await createFurniture(data);
  ctx.page.redirect(`/`);
}
