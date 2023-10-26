import { html } from "../lib.js";
import { login } from "../user.js";


let loginTemplate = (onSubmit) => html`<section id="login">
    <div class="form">
        <h2>Login</h2>
        <form class="login-form" @submit=${onSubmit}>
            <input type="text" name="email" id="email" placeholder="email" />
            <input type="password" name="password" id="password" placeholder="password" />
            <button type="submit">login</button>
            <p class="message">
                Not registered? <a href="/register">Create an account</a>
            </p>
        </form>
    </div>
</section>`


export function loginView(ctx) {
    ctx.render(loginTemplate(onSubmit));

    async function onSubmit(ev) {

        ev.preventDefault();

        let formData = new FormData(ev.target);

        let email = formData.get('email');
        let password = formData.get('password');

        if (email == '' || password == '') {
            return alert('Invalid email or password!');
        }


        await login(email, password);

        ctx.checkUserNav();
        ctx.page.redirect('/catalog');
    }
}

