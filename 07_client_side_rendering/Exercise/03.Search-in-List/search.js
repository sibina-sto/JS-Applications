import { render, html } from '/lib.js';
import templateTown from '/templates/templateTown.js';
import { towns } from './towns.js';

const section = document.getElementById('towns');
const result = document.getElementById('result');
const input = document.getElementById('searchText');

window.addEventListener('DOMContentLoaded', loadTowns);

function loadTowns() {
  render(
    html`
      <ul>
        ${towns.map(templateTown)}
      </ul>
    `,
    section
  );
}

document.querySelector('button').addEventListener('click', () => {
  const matches = Array.from(section.querySelectorAll('ul li')).filter(el => {
    return el.textContent.includes(input.value);
  });

  matches.forEach(el => el.classList.toggle('active'));
  render(html`${matches.length} matches found`, result);
});
