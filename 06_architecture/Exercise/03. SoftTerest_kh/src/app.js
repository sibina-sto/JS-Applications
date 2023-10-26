import { goTo } from '../router.js';

// initaly load the home page
goTo('/home');

// get started redirects to the register page
document.getElementById('start').addEventListener('click', ev => {
    ev.preventDefault();
    goTo('/register');
});
