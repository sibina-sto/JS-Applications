import { logout } from './api/data.js';
import { page, render } from './lib.js';
import { getUserData } from './util.js';
import { homePage } from './views/home.js';
import { loginPage } from './views/login.js';
import { registerPage } from './views/register.js';
import { createPage } from './views/create.js';
import { detailsPage } from './views/details.js';
import { editPage } from './views/edit.js';
import { profilePage } from './views/profile.js';

//debug
//import * as api from './api/api.js';
//window.api = api;

const root = document.getElementById('content');
document.getElementById('logoutBtn').addEventListener('click', onLogout);
const userNavBtns = Array.from(document.querySelectorAll('.user-nav'));
const guestNavBtns = Array.from(document.querySelectorAll('.guest-nav'));

page(decorateContext);
page('/', homePage);
page('/login', loginPage);
page('/register', registerPage);
page('/create', createPage)
page('/edit/:id', editPage);
page('/details/:id', detailsPage)
page('/profile', profilePage);

updateUserNav();
page.start();

function decorateContext(ctx, next) {
    ctx.render = (content) => render(content, root);
    ctx.updateUserNav = updateUserNav;

    next();
}

function onLogout() {
    logout();
    updateUserNav();
    page.redirect('/');
}

function updateUserNav() {
    const userData = getUserData();

    userNavBtns.forEach((btn) => btn.style.display = userData ? 'block' : 'none');
    guestNavBtns.forEach((btn) => btn.style.display = userData ? 'none' : 'block');
}