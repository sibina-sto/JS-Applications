import { login } from '../api/users.js';
import { html } from '../lib.js';

const loginTemplate = (onSubmit, ctx) => html`
  <div class="row space-top">
    <div class="col-md-12">
      <h1>Login User</h1>
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
        <input type="submit" class="btn btn-primary" value="Login" />
      </div>
    </div>
  </form>
  </div>
`;

export function loginView(ctx) {
    ctx.updateUserNav();
    ctx.render(loginTemplate(onSubmit, ctx));
}

async function onSubmit(ctx, ev) {
    ev.preventDefault();
    const formData = new FormData(ev.target);
    const { email, password } = Object.fromEntries(formData);
    await login(email, password);
    ev.target.reset();
    ctx.page.redirect('/');
}
