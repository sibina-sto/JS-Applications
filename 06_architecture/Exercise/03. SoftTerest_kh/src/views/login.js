import { goTo, showSection } from '../../router.js';
import { login } from '../api/users.js';

const section = document.querySelector('#loginSection');
section.remove();

export function showLogin() {
    showSection(section);
}

const form = section.querySelector('form');
form.addEventListener('submit', handleForm);

async function handleForm(ev) {
    ev.preventDefault();
    const formData = new FormData(form);
    const email = formData.get('email');
    const password = formData.get('password');
    if (email == '' || password == '') {
        return;
    }
    await login({ email, password });
    goTo('/catalog');
}
