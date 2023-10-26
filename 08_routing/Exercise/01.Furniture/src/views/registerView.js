import { onRegister } from "../api.js";
import { html } from "../../node_modules/lit-html/lit-html.js";

const registerTemp = (context) => html`
  <div class="row space-top">
    <div class="col-md-12">
      <h1>Register New User</h1>
      <p>Please fill all fields.</p>
    </div>
  </div>
  <form @submit=${(e) => register(e, context)}>
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
        <div class="form-group">
          <label class="form-control-label" for="rePass">Repeat</label>
          <input
            class="form-control"
            id="rePass"
            type="password"
            name="rePass"
          />
        </div>
        <input type="submit" class="btn btn-primary" value="Register" />
      </div>
    </div>
  </form>
`;

export async function registerView(context) {
  context.render(registerTemp(context), context.container);
}

async function register(ev, context) {
  ev.preventDefault();
  let formData = new FormData(ev.target);
  let data = {
    email: formData.get("email"),
    password: formData.get("password"),
  };
  if (data.email == "" && data.password == "") {
    return alert("All fields required!");
  }
  if (data.password != formData.get("rePass")) {
    return alert("Password doesn't match! Please try again!");
  }
  sessionStorage.userData = JSON.stringify(await onRegister(data));
  context.updateNav();
  context.page.redirect("/catalog");
}
