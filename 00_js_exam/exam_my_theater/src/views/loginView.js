import { html } from '../../node_modules/lit-html/lit-html.js';
import * as userService from '../api/userService.js';
import { submitHandler } from '../utils/utils.js';

const loginTemplate = submitHandler => html`
  <section id="loginaPage">
    <form class="loginForm" @submit=${submitHandler}>
      <h2>Login</h2>
      <div>
        <label for="email">Email:</label>
        <input id="email" name="email" type="text" placeholder="steven@abv.bg" value="" />
      </div>
      <div>
        <label for="password">Password:</label>
        <input id="password" name="password" type="password" placeholder="********" value="" />
      </div>

      <button class="btn" type="submit">Login</button>

      <p class="field">
        <span>If you don't have profile click <a href="#">here</a></span>
      </p>
    </form>
  </section>
`;

export const loginView = ctx => {
  const onSubmit = async (data, form) => {
    // send request and validate
    if (Object.values(data).some(val => val == '')) {
      return alert('Please fill all the fields');
    }
    try {
      await userService.login(data.email, data.password);
      ctx.page.redirect('/');
    } catch (error) {
      alert(error.message);
    }
  };
  ctx.renderContent(loginTemplate(submitHandler(onSubmit)));
};
