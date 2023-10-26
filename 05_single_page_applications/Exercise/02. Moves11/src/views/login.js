import { html } from "../lib.js";
import { login } from "../api/user.js";
import { createSubmitHandler } from "../util.js";

const loginTemplate = (onLogin) => html`
      <section id="form-login" class="view-section">
        <form @submit=${onLogin}
          id="login-form"
          class="text-center border border-light p-5"
          action=""
          method=""
        >
          <div class="form-group">
            <label for="email">Email</label>
            <input
              id="email"
              type="email"
              class="form-control"
              placeholder="Email"
              name="email"
              value=""
            />
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input
              id="password"
              type="password"
              class="form-control"
              placeholder="Password"
              name="password"
              value=""
            />
          </div>

          <button type="submit" class="btn btn-primary">Login</button>
        </form>
      </section>`;

export async function showLogin(ctx) {
    ctx.render(loginTemplate(createSubmitHandler(onLogin)))

    async function onLogin({email, password}) {
        if (email == "" || password == ""){
            return alert('All fields are required!')
        }

        await login(email,password);
        ctx.updateNav();
        ctx.page.redirect('/');
    }
}