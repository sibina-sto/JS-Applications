import { html } from "../lib.js";
import { register } from "../user.js";


const registerTemplate = (onSubmit) => html`<section id="register">
    <div class="form">
        <h2>Register</h2>
        <form class="login-form" @submit=${onSubmit}>
            <input type="text" name="email" id="register-email" placeholder="email" />
            <input type="password" name="password" id="register-password" placeholder="password" />
            <input type="password" name="re-password" id="repeat-password" placeholder="repeat password" />
            <button type="submit">register</button>
            <p class="message">Already registered? <a href="/login">Login</a></p>
        </form>
    </div>
</section>`


export function registerView(ctx) {
    ctx.render(registerTemplate(onSubmit));

    async function onSubmit(ev) {

        ev.preventDefault();

        let formData = new FormData(ev.target);

        let email = formData.get('email');
        let password = formData.get('password');
        let rePassword = formData.get('re-password');

        if (email == '' || password == '') {
            return alert('Invalid email or password!');
        }

        if (password != rePassword) {
            return alert('Passwords don\'t match!');
        }

        await register(email, password);

        ctx.checkUserNav();
        ctx.page.redirect('/catalog');
    }
}

