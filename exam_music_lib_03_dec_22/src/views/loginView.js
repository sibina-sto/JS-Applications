import { html } from "../../node_modules/lit-html/lit-html.js";
import * as userService from "../api/userService.js";
import { submitHandler } from "../utils.js";

const loginTemplate = (submitHandler) => html`
  <section id="login">
    <div class="form" @submit=${submitHandler}>
      <h2>Login</h2>
      <form class="login-form">
        <input type="text" name="email" id="email" placeholder="email" />
        <input
          type="password"
          name="password"
          id="password"
          placeholder="password"
        />
        <button type="submit">login</button>
        <p class="message">Not registered? <a href="#">Create an account</a></p>
      </form>
    </div>
  </section>
`;

export const loginView = (ctx) => {
  const onSubmit = async (data, form) => {
    // send request and validate
    if (Object.values(data).some((val) => val == "")) {
      return alert("Please fill all the fields");
    }
    try {
      await userService.login(data.email, data.password);
      ctx.page.redirect("/catalog");
    } catch (error) {
      alert(error.message);
    }
  };
  ctx.renderContent(loginTemplate(submitHandler(onSubmit)));
};
