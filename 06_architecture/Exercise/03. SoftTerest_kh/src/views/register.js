import { goTo, showSection } from '../../router.js';
import { register } from '../api/users.js';

const section = document.querySelector('#registerSection');
section.remove();

export function showRegister() {
    showSection(section);
}

const form = section.querySelector('form');
// console.log(form);
form.addEventListener('submit', handleForm);

async function handleForm(ev) {
    ev.preventDefault();
    const formData = new FormData(form);
    const email = formData.get('email');
    const password = formData.get('password');
    const repeatPassword = formData.get('repeatPassword');
    if (email == '' || password == '' || repeatPassword == '') {
        return;
    }
    await register({ email, password });
    form.reset();
    goTo('/catalog');
}
