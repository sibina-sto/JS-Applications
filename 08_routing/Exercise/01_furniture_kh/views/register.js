import { html } from '../lib.js';
import { register } from '../api/users.js';

const registerTemplate = (onSubmit, ctx) => html`
<div class="row space-top">
  <div class="col-md-12">
    <h1>Register New User</h1>
    <p>Please fill all fields.</p>
  </div>
</div>
<form @submit=${onSubmit.bind(null, ctx)}>
  <div class="row space-top">
    <div class="col-md-4">
      <div class="form-group">
        <label class="form-control-label" for="email">Email</label>
        <input class="form-control" id="email" type="text" name="email">
      </div>
      <div class="form-group">
        <label class="form-control-label" for="password">Password</label>
        <input class="form-control" id="password" type="password" name="password">
      </div>
      <div class="form-group">
        <label class="form-control-label" for="rePass">Repeat</label>
        <input class="form-control" id="rePass" type="password" name="rePass">
      </div>
      <input type="submit" class="btn btn-primary" value="Register" />
    </div>
  </div>
</form>
</div>
`;

export function registerView(ctx) {
  ctx.updateUserNav();
  ctx.render(registerTemplate(onSubmit, ctx));
}

async function onSubmit(ctx, ev) {
  ev.preventDefault();
  debugger;
  const formData = new FormData(ev.target);
  const { email, password, rePass } = Object.fromEntries(formData);
  if (password !== rePass) {
    return;
  }
  await register(email, password);
  ev.target.reset();
  ctx.page.redirect('/');
}
