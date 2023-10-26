import page from '../node_modules/page/page.mjs';
import { addRender } from './middlewares/renderContentMiddleware.js';
import { addNavigation } from './middlewares/navigationMiddleware.js';
import { addSession } from './middlewares/sessionMiddleware.js';
import * as authService from './api/authService.js';
import { navigationTemplate } from './views/navigationView.js';
import { loginView } from './views/loginView.js';
import { registerView } from './views/registerView.js';
import { logoutView } from './views/logoutView.js';
import { homeView } from './views/homeView.js';
import { createView } from './views/createView.js';
import { profileView } from './views/profileView.js';
import { detailsView } from './views/detailsView.js';
import { addData } from './middlewares/dataMiddleware.js';
import { getDetails } from './api/dataService.js';
import { editView } from './views/editView.js';

// *** fix the roots for the content and the navigation ***
const contentRoot = document.getElementById('content');
const navRoot = document.getElementById('site-header');

page(addRender(contentRoot, navRoot));
page(addSession(authService.getUser));
page(addNavigation(navigationTemplate));
page('/', homeView);
page('/login', loginView);
page('/register', registerView);
page('/logout', logoutView);
page('/create', createView);
page('/profile', profileView);
page('/details/:id', addData(getDetails), detailsView);
page('/edit/:id', addData(getDetails), editView);
page.start();
