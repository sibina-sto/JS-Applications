import { html } from '../../node_modules/lit-html/lit-html.js';

export const component = item => html`
  <li class="card">
    <img src=${item.imageUrl} alt="travis" />
    <p><strong>Singer/Band: </strong><span class="singer">${item.singer}</span></p>
    <p><strong>Album name: </strong><span class="album">${item.album}</span></p>
    <p><strong>Sales:</strong><span class="sales">${item.sales}</span></p>
    <a class="details-btn" href="/details/${item._id}">Details</a>
  </li>
`;
