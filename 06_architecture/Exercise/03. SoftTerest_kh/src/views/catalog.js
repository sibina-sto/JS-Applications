import { goTo, showSection } from '../../router.js';
import { getAllIdeas } from '../api/data.js';

const section = document.querySelector('#dashboard-holder');
section.remove();

export function showCatalog() {
    loadIdeas();
    showSection(section);
}

async function loadIdeas() {
    const ideas = await getAllIdeas();
    if (ideas.lenght == 0) {
        section.innerHTML = `<h1>No ideas yet ! Be the first one :)</h1>`;
    }
    section.replaceChildren(...ideas.map(createIdea));
}

function createIdea(idea) {
    const div = document.createElement('div');
    div.className = 'card overflow-hidden current-card details';
    div.style.width = '20rem';
    div.style.height = '18rem';
    div.innerHTML = `
        <div class="card-body">
        <p class="card-text">${idea.title}</p>
        </div>
        <img class="card-image" src="${idea.img}" alt="Card image cap">
        <a data-id="${idea._id}" class="btn" href="/details">Details</a>
    `;
    return div;
}

section.addEventListener('click', handleArticles);

async function handleArticles(ev) {
    ev.preventDefault();
    if (ev.target.nodeName !== 'A') {
        return;
    }
    goTo('/details', ev.target.dataset.id);
}