

const views = {
    '/': () => '<h2>Home Page</h2>',
    '/catalog': () => '<h2>Catalog</h2>',
    '/about': () => '<h2>About Page</h2>',
};

const main = document.querySelector('main');
document.querySelector('nav').addEventListener('click', onNavigate);

const name = window.location.pathname;
showView('name');

function onNavigate(event) {
    // console.log('navigate')
    if (event.target.tagName == 'A') {
        const url = new URL(event.target.href);
        if (showView(url.pathname)) {
            event.preventDefault();
            history.pushState(null, '', url.pathname);
        }
    }
}

function showView(name) {
    const view = views[name];
    if (typeof view == "fuction"){
        main.innerHTML = view();
        return true;
    } else {
        return false;
    }
    
}