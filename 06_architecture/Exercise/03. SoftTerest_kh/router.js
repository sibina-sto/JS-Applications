import { logout } from './src/api/users.js';
import { showCatalog } from './src/views/catalog.js';
import { showCreate } from './src/views/create.js';
import { showDetails } from './src/views/details.js';
import { showHome } from './src/views/home.js';
import { showLogin } from './src/views/login.js';
import { showRegister } from './src/views/register.js';

// main section to display all the views
const main = document.getElementById('main');
const navigation = document.querySelector('nav');

// events
navigation.addEventListener('click', onNavigate);

// links
const links = {
    '/home': showHome,
    '/login': showLogin,
    '/register': showRegister,
    '/catalog': showCatalog,
    '/create': showCreate,
    '/logout': onLogout,
    '/details': showDetails,
};

// show the current sechtion function
export function showSection(section) {
    main.replaceChildren(section);
}

// goto function to change the views
export function goTo(name, ...params) {
    const view = links[name];
    if (typeof view == 'function') {
        updateNav();
        view(...params);
    }
}

// function to navigate throw the links
function onNavigate(ev) {
    let target = ev.target;
    if (target.tagName == 'IMG') {
        ev.preventDefault();
        target = target.parentElement;
    }
    if (target.tagName == 'A') {
        ev.preventDefault();
        const newURL = new URL(target.href);
        goTo(newURL.pathname);
    }
}

// updating the navigation
export function updateNav() {
    const user = sessionStorage.getItem('userdata');
    if (user) {
        document.getElementById('user').style.display = 'flex';
        document.getElementById('guest').style.display = 'none';
    } else {
        document.getElementById('user').style.display = 'none';
        document.getElementById('guest').style.display = 'flex';
    }
}

async function onLogout() {
    await logout();
    goTo('/home');
}