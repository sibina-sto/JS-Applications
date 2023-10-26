import { html } from '../../node_modules/lit-html/lit-html.js';
import * as userService from '../api/userService.js';
import { submitHandler } from '../utils/utils.js';

const registerTemplate = submitHandler => html`
  <!--Register Page-->
  <section id="registerPage">
    <form class="registerForm" @submit=${submitHandler}>
      <h2>Register</h2>
      <div class="on-dark">
        <label for="email">Email:</label>
        <input id="email" name="email" type="text" placeholder="steven@abv.bg" value="" />
      </div>

      <div class="on-dark">
        <label for="password">Password:</label>
        <input id="password" name="password" type="password" placeholder="********" value="" />
      </div>

      <div class="on-dark">
        <label for="repeatPassword">Repeat Password:</label>
        <input id="repeatPassword" name="repeatPassword" type="password" placeholder="********" value="" />
      </div>

      <button class="btn" type="submit">Register</button>

      <p class="field">
        <span>If you have profile click <a href="#">here</a></span>
      </p>
    </form>
  </section>
`;

export const registerView = ctx => {
  const onSubmit = async (data, form) => {
    // send request and validate
    if (Object.values(data).some(val => val == '')) {
      return alert('Please fill all the fields');
    }
    if (data.password !== data.repeatPassword) {
      return alert('password missmatch');
    }
    try {
      await userService.register(data.email, data.password);
      ctx.page.redirect('/');
    } catch (error) {
      alert(error.message);
    }
  };
  ctx.renderContent(registerTemplate(submitHandler(onSubmit)));
};
