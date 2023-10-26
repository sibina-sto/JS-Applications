import { onLogin } from "../api.js";
import { html } from "../../node_modules/lit-html/lit-html.js";

const loginTemp = (context) => html`
  <div class="row space-top">
    <div class="col-md-12">
      <h1>Login User</h1>
      <p>Please fill all fields.</p>
    </div>
  </div>
  <form @submit=${(e) => login(e, context)}>
    <div class="row space-top">
      <div class="col-md-4">
        <div class="form-group">
          <label class="form-control-label" for="email">Email</label>
          <input class="form-control" id="email" type="text" name="email" />
        </div>
        <div class="form-group">
          <label class="form-control-label" for="password">Password</label>
          <input
            class="form-control"
            id="password"
            type="password"
            name="password"
          />
        </div>
        <input type="submit" class="btn btn-primary" value="Login" />
      </div>
    </div>
  </form>
`;

export async function loginView(context) {
  context.render(loginTemp(context), context.container);
}

export async function login(e, context) {
  e.preventDefault();
  let formData = new FormData(e.target);
  let data = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  if (data.email == "" && data.password == "") {
    return alert("All fields required!");
  }

  sessionStorage.userData = JSON.stringify(await onLogin(data));
  context.updateNav();
  context.page.redirect("/catalog");
}
