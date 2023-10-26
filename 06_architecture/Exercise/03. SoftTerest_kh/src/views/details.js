import { goTo, showSection } from '../../router.js';
import { del } from '../api/api.js';
import { getSingleIdea } from '../api/data.js';

const section = document.querySelector('#detailsSection');
section.remove();

export async function showDetails(id) {
    showSection(section);
    const data = await getSingleIdea(id);
    const userData = JSON.parse(sessionStorage.getItem('userdata'));
    section.replaceChildren(createDetails(data));
    if (userData && userData.id == data._ownerId) {
        section.querySelector('div').innerHTML += `<div class="text-center">
        <a class="btn detb" href="">Delete</a>
    </div>`;
    }
    document.querySelector('.btn').addEventListener('click', async function (ev) {
            ev.preventDefault();
            await del(`/data/ideas/${id}`);
            goTo('/catalog');
        });
}

function createDetails(data) {
    const div = document.createElement('div');
    div.innerHTML = `
        <img class="det-img" src="${data.img}" />
        <div class="desc">
        <h2 class="display-5">${data.title}</h2>
        <p class="infoType">Description:</p>
        <p class="idea-description">${data.description}</p>
        `;
    return div;
}