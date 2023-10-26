import { goTo, showSection } from '../../router.js';
import { createIdea } from '../api/data.js';

const section = document.querySelector('#createSection');
section.remove();

export function showCreate() {
    showSection(section);
}

const form = section.querySelector('form');
form.addEventListener('submit', handleForm);

async function handleForm(ev) {
    ev.preventDefault();
    const formData = new FormData(form);
    const title = formData.get('title');
    const description = formData.get('description');
    const img = formData.get('imageURL');

    if (title == '' || description == '' || img == '') {
        return alert('empty fields');
    }
    debugger;
    await createIdea({ title, img, description });
    debugger;
    goTo('/catalog');
}