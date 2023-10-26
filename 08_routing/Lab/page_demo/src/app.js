import page from '../node_modules/page/page.mjs';


page('/', () => console.log('<h1>Home Page</h1>'));
page("/catalog", () => console.log("<h1>Catalog</h1>"));
page("/about", () => console.log("<h1>About</h1>"));

page.start();


