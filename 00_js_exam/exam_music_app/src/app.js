import {page, render} from './lib.js'
import {homePage} from "./views/home.js";
import {logout} from "./api/api.js";
import {loginPage} from "./views/login.js";
import {registerPage} from "./views/register.js";
import {catalogPage} from "./views/catalog.js";
import {detailsPage} from "./views/details.js";
import {createPage} from "./views/create.js";
import {editPage} from "./views/edit.js";
import {searchPage} from "./views/search.js";
import {getUserData} from "./util.js";


const root = document.getElementById('main-content');


page(decorateContext);
page('/', homePage);
page('/login', loginPage);
page('/register', registerPage);
page('/catalog', catalogPage);
page('/create', createPage);
page('/details/:id', detailsPage);
page('/edit/:id', editPage);
page('/search', searchPage);

updateUserNav();
page.start();

function decorateContext(ctx, next) {
    ctx.render = (content) => render(content, root);
    ctx.updateUserNav = updateUserNav;

    next();
}


function onLogout() {
    logout();
    page.redirect('/');
    updateUserNav();
}

function updateUserNav() {
    const userData = getUserData()
    const ul = document.querySelector('ul')


    if (userData) {
        ul.innerHTML = `
        <li><a href="/catalog">Catalog</a></li>
        <li><a href="/search">Search</a></li>
        <li><a href="/create">Create Album</a></li>
        <li><a id ='logoutBtn' href="javascript:void(0)">Logout</a></li>`
        document.getElementById('logoutBtn').addEventListener('click', onLogout)

    } else {
        ul.innerHTML = `
        <li><a href="/catalog">Catalog</a></li>
        <li><a href="/search">Search</a></li>
        <li><a href="/login">Login</a></li>
        <li><a href="/register">Register</a></li>`
    }
}