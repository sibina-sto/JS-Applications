import { deleteEventById, getEventById, getTotalLikes, giveLike, userHasLikedEvent } from '../api/data.js';
import { html } from '../lib.js';
import { getUserData } from '../util.js';

const detailsTemplate = (event, isOwner, onDelete, totalLikes, canLike, onLike) => html`
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
                ${isOwner ? html`
                <a @click=${onDelete} class="btn-delete" href="javascript:void(0)">Delete</a>
                <a class="btn-edit" href="/edit/${event._id}">Edit</a>`
                : null}
                ${canLike ? html`<a @click=${onLike} class="btn-like" href="javascript:void(0)">Like</a>` : null}
            </div>
            <p class="likes">Likes: ${totalLikes}</p>
        </div>
    </div>
</section>`;

export async function detailsPage(ctx) {
    const event = await getEventById(ctx.params.id);
    const totalLikes = await getTotalLikes(ctx.params.id);

    const userData = getUserData();
    const isOwner = userData && userData.id == event._ownerId;

    const hasLiked = userData && await userHasLikedEvent(ctx.params.id, userData.id);
    const canLike = userData && !isOwner && !hasLiked;

    ctx.render(detailsTemplate(event, isOwner, onDelete, totalLikes, canLike, onLike));

    async function onDelete() {
        const confirmed = confirm('Are you sure you want to delete this event?');

        if (confirmed) {
            await deleteEventById(ctx.params.id);
            ctx.page.redirect('/profile');
        }
    }

    async function onLike() {
        await giveLike(ctx.params.id);
        ctx.page.redirect('/details/' + ctx.params.id);
    }
}