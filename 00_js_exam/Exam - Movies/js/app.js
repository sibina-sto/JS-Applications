import home, {
  createPage,
  createPost,
  editPage,
  editPost,
  detailsPage,
  like,
  deleteMovie,
} from './controllers/catalog.js';
import {
  registerPage,
  registerPost,
  loginPage,
  loginPost,
  logout,
} from './controllers/user.js';

window.addEventListener('load', () => {
  const app = Sammy('#container', function () {
    this.use('Handlebars', 'hbs');

    this.userData = {
      email: sessionStorage.getItem('email') || '',
      userId: sessionStorage.getItem('userId') || '',
    };

    this.get('/', home);
    this.get('#/home', home);
    this.get('index.html', home);
    this.get('#/login', loginPage);
    this.get('#/register', registerPage);
    this.get('#/logout', logout);
    this.get('#/create', createPage);
    this.get('#/edit/:id', editPage);
    this.get('#/details/:id', detailsPage);
    this.get('#/like/:id', like);
    this.get('#/delete/:id', deleteMovie);

    this.post('#/login', (x) => {
      loginPost.call(x);
    });
    this.post('#/register', (x) => {
      registerPost.call(x);
    });
    this.post('#/create', (x) => {
      createPost.call(x);
    });
    this.post('#/edit/:id', (x) => {
      editPost.call(x);
    });

    this.get('', () => {
      this.swap('<h1>404 Page not found!</h1>');
    });
  });
  app.run();
});
