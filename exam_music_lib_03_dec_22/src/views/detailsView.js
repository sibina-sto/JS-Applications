import { html, nothing } from '../../node_modules/lit-html/lit-html.js';
import { deleteAlbum, getLikes, getOwnLikes, giveLike } from '../api/dataService.js';

const detailsTemplate = (item, count, actions) => html`
  <section id="details">
    <div id="details-wrapper">
      <p id="details-title">Album Details</p>
      <div id="img-wrapper">
        <img src=${item.imageUrl} alt="example1" />
      </div>
      <div id="info-wrapper">
        <p><strong>Band:</strong><span id="details-singer">${item.singer}</span></p>
        <p><strong>Album name:</strong><span id="details-album">${item.album}</span></p>
        <p><strong>Release date:</strong><span id="details-release">${item.release}</span></p>
        <p><strong>Label:</strong><span id="details-label">${item.label}</span></p>
        <p><strong>Sales:</strong><span id="details-sales">${item.sales}</span></p>
      </div>
      <div id="likes">Likes: <span id="likes-count">${count}</span></div>

      <!--Edit and Delete are only for creator-->
      <div id="action-buttons">
        ${item.isOwner
          ? html` <a href="/edit/${item._id}" id="edit-btn">Edit</a>
              <a href="javascript:void(0)" id="delete-btn" @click=${actions.onDelete}>Delete</a>`
          : nothing}
        ${item.canLike ? html`<a href="" id="like-btn" @click=${actions.onLike}>Like</a>` : nothing}
      </div>
    </div>
  </section>
`;

export const detailsView = async ctx => {
  const id = ctx.params.id;
  const likes = await getLikes(id);
  const own = await getOwnLikes(id, ctx.user?._id);
  ctx.data.canLike = !ctx.data.isOwner && ctx.data.isLogged && !own
  const onDelete = async () => {
    await deleteAlbum(id)
    ctx.page.redirect("/catalog")
  }
  const onLike = async () => {
    await giveLike(id)
  }
  const actions = {
    onDelete,
    onLike
  }
  ctx.renderContent(detailsTemplate(ctx.data, likes, actions));
};
