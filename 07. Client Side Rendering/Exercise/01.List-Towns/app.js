import {html , render} from '../node_modules/lit-html/lit-html.js';



const listTemplate = (data) => html `
<ul>
    ${data.map(t => html`<li>${t}</li>`)}
</ul>`;

document.getElementById('btnLoadTowns').addEventListener('click',updateList);

function updateList(e) {
    e.preventDefault();
const townsAdString = document.getElementById('towns').value;
const towns =  townsAdString.split(', ').map(t => t.trim());
const root = document.getElementById('root');

const result = listTemplate(towns);

render(result,root);
}
