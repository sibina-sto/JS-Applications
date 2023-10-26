import { html } from '../../node_modules/lit-html/lit-html.js';
import { getAlbums } from '../api/dataService.js';
import { component } from '../component/component.js';

const catalogTemplate = items => html`
  <section id="dashboard">
    <h2>Albums</h2>
    ${!items.length
      ? html`<h2>There are no albums added yet.</h2>`
      : html`<ul class="card-wrapper">
          ${items.map(component)}
        </ul>`}
  </section>
`;

export const catalogView = async ctx => {
  const albums = await getAlbums();
  ctx.renderContent(catalogTemplate(albums));
};
