import { cats } from '/catSeeder.js';
import catTemplate from './templates/cats.js';
import { html, render } from '/lib.js';

const section = document.getElementById('allCats');

window.addEventListener('DOMContentLoaded', loadCats);

function loadCats() {
    render(
        html`
            <ul>
                <li>${cats.map(catTemplate)}</li>
            </ul>
        `,
        section
    );
}
