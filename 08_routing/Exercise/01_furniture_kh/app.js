import { page, render } from '/lib.js';
import { homeView } from './views/home.js';
import { loginView } from './views/login.js';
import { registerView } from './views/register.js';
import { detailsView } from './views/details.js';
import { createView } from './views/create.js';
import { myFurnitureView } from './views/myFurnitureView.js';
import { logout } from './api/users.js';
import { getUserData } from './util.js';
import { showEdit } from './views/edit.js';

const main = document.querySelector('.container');

page(decorateContext);
page('/', homeView);
page('/login', loginView);
page('/register', registerView);
page('/create', createView);
page('/my-furniture', myFurnitureView);
page('/edit/:id', showEdit);
page('/details/:id', detailsView);

page.start();

document.getElementById('logoutBtn').addEventListener('click', async () => {
  await logout();
  page.redirect('/');
});

function updateUserNav() {
  const userData = JSON.parse(sessionStorage.getItem('userdata'));
  const user = document.getElementById('user');
  const guest = document.getElementById('guest');
  if (userData) {
    guest.style.display = 'none';
    user.style.display = 'inline-block';
  } else {
    guest.style.display = 'inline-block';
    user.style.display = 'none';
  }
}

function decorateContext(ctx, next) {
  ctx.render = content => render(content, main);
  ctx.updateUserNav = updateUserNav;
  ctx.getUserData = getUserData;
  next();
}
