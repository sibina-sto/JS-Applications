import { logout } from './user.js';
import { getUserData } from './utility.js'
import { page, render as litRender } from './lib.js';
import { homeView } from './views/homeView.js';
import { loginView } from './views/login.js';
import { registerView } from './views/register.js';
import { remove } from './api.js';
import { catalogView } from './views/catalog.js';
import { createView } from './views/create.js';
import { detailsView } from './views/details.js';
import { editView } from './views/edit.js';

let mainElement = document.querySelector('main');
let logoutBtn = document.querySelector('#logoutBtn');
logoutBtn.addEventListener('click', logoutUser);

page(decorateContext);
page('', '/home');
page('/', '/home');
page('/home', homeView);
page('/login', loginView);
page('/register', registerView);
page('/register', registerView);
page('/catalog', catalogView);
page('/details/:offerId', detailsView);
page('/create', createView);
page('/catalog/edit/:offerId', editView);
page('/catalog/delete/:offerId', deleteOffer);
checkUserNav();
page.start();

function decorateContext(ctx, next) {
    ctx.render = renderMain;
    ctx.checkUserNav = checkUserNav;
    next();
}

function renderMain(templateResult) {
    return litRender(templateResult, mainElement);
}

function checkUserNav() {
    let userData = getUserData();
    if (userData) {
        document.querySelector('.user').style.display = 'block';
        document.querySelector('.guest').style.display = 'none';
    } else {
        document.querySelector('.user').style.display = 'none';
        document.querySelector('.guest').style.display = 'block';
    }
}


function logoutUser() {
    logout();
    page('/');
    checkUserNav();
}


async function deleteOffer(ctx) {
    let confirmDialog = confirm('Are you sure?');

    if (confirmDialog) {

        await remove('/data/offers/' + ctx.params.offerId);
        ctx.page.redirect('/catalog');
    }

}