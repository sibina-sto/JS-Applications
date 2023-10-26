import { html, render, page, nothing } from "../lib.js";
import { getUserData } from "../util.js";
import { logout } from "../api/user.js";

const nav = document.querySelector('nav')

const navTemplate = (hasUser) => html`
<a class="navbar-brand text-light" href="/">Movies</a>
<ul class="navbar-nav ml-auto">
    ${hasUser ? html`    
    <li class="nav-item user">
    <a class="nav-link" id="welcome-msg">Welcome, ${hasUser.email}
        <a @click=${onLogout} class="nav-link" href="javascript:void(0)">Logout</a>
    </li>` : html`    <li class="nav-item guest">
        <a class="nav-link" href="/login">Login</a>
    </li>
    <li class="nav-item guest">
        <a class="nav-link" href="/register">Register</a>
    </li>`}
</ul>`;

export function updateNav() {
    const user = getUserData()
    render(navTemplate(user), nav);
}

function onLogout() {
    logout();
    updateNav()
    page.redirect('/login')
}
