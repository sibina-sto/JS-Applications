import { html, nothing } from '../../node_modules/lit-html/lit-html.js';
import { deleteEvent, getLikes, getOwn, like } from '../api/dataService.js';

const detailsTemplate = (event, count, actions) => html`
  <section id="detailsPage">
    <div id="detailsBox">
      <div class="detailsInfo">
        <h1>Title: ${event.title}</h1>
        <div>
          <img src=${event.imageUrl} />
        </div>
      </div>

      <div class="details">
        <h3>Theater Description</h3>
        <p>${event.description}</p>
        <h4>Date: ${event.date}</h4>
        <h4>Author: ${event.author}</h4>

        <div class="buttons">
          ${event.isOwner
            ? html`<a class="btn-delete" href="javascript:void(0)" @click=${actions.onDelete}>Delete</a>
                <a class="btn-edit" href="/edit/${event._id}">Edit</a>`
            : nothing}
          ${event.canLike
            ? html`<a class="btn-like" href="" @click=${actions.onLike}>Like</a>`
            : nothing}
          <p class="likes">Likes: ${count}</p>
        </div>
      </div>
    </div>
  </section>
`;

export const detailsView = async ctx => {
  const id = ctx.params.id;
  const likes = await getLikes(id);
  const own = await getOwn(id, ctx.user?._id);
  ctx.data.canLike = !ctx.data.isOwner && ctx.data.isLogged && !own;
  const onDelete = async () => {
    await deleteEvent(id);
    ctx.page.redirect('/');
  };
  const onLike = async () => {
    await like(id);
    // ctx.page.redirect(`/details/${id}`);
  };
  const actions = {
    onDelete,
    onLike,
  };
  ctx.renderContent(detailsTemplate(ctx.data, likes, actions));
};
