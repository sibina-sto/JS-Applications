import townsTemplate from '/template/towns.js';
import { render, html } from '/lib.js';

const root = document.getElementById('root');
const input = document.getElementById('towns');

document.getElementById('btnLoadTowns').addEventListener('click', onRender);

function onRender(e) {
    e.preventDefault();
    
    if (input.value == '') {
        return;
    }

    render(
        html`
            <ul>
                ${input.value.split(', ').map(townsTemplate)}
            </ul>
        `,
        root
    );
}
