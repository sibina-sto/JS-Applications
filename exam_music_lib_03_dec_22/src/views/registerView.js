import { html } from "../../node_modules/lit-html/lit-html.js";
import * as userService from "../api/userService.js";
import { submitHandler } from "../utils.js";

const registerTemplate = (submitHandler) => html`
  <!--Register Page-->
  <section id="register">
    <div class="form" @submit=${submitHandler}>
      <h2>Register</h2>
      <form class="login-form">
        <input
          type="text"
          name="email"
          id="register-email"
          placeholder="email"
        />
        <input
          type="password"
          name="password"
          id="register-password"
          placeholder="password"
        />
        <input
          type="password"
          name="re-password"
          id="repeat-password"
          placeholder="repeat password"
        />
        <button type="submit">register</button>
        <p class="message">Already registered? <a href="#">Login</a></p>
      </form>
    </div>
  </section>
`;

export const registerView = (ctx) => {
  const onSubmit = async (data, form) => {
    // send request and validate
    if (Object.values(data).some((val) => val == "")) {
      return alert("Please fill all the fields");
    }
    if (data.password !== data["re-password"]) {
      return alert("password missmatch");
    }
    try {
      await userService.register(data.email, data.password);
      ctx.page.redirect("/catalog");
    } catch (error) {
      alert(error.message);
    }
  };
  ctx.renderContent(registerTemplate(submitHandler(onSubmit)));
};
