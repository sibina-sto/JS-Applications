import { html, nothing } from '../lib/lit-html.js';
import { repeat } from '../lib/directives/repeat.js';
import * as roomService from '../data/room.js';
import * as reservationService from '../data/reservation.js';
import { submitHandler } from '../util.js';


const detailsTemplate = (room, hasUser, onDelete, onBook) => html`
<h2>${room.name}</h2>
<p>Location: ${room.location}</p>
<p>Beds: ${room.beds}</p>
${hasUser && !room.isOwner ? reservationForm(onBook) : nothing}
${room.isOwner ? html`
<a href="/edit/${room.objectId}">Edit</a>
<a href="javascript:void(0)" @click=${onDelete}>Delete</a>` : nothing}
${hasUser ? html`
<ul>
    ${repeat(room.reservations, r => r.objectId, reservationCard)}
</ul>` : nothing}`;


const reservationForm = (onSubmit) => html`
<form @submit=${onSubmit}>
    <label>From <input type="date" name="startDate"></label>
    <label>To <input type="date" name="endDate"></label>
    <button>Request reservation</button>
</form>`;

const reservationCard = (res) => html`
<li>From: ${res.startDate.toISOString().slice(0,10)} To: ${res.endDate.toISOString().slice(0,10)} By: ${res.owner.username}</li>`;

export async function detailsView(ctx) {
    const id = ctx.params.id;
    const room = ctx.data;

    const hasUser = Boolean(ctx.user);
    room.isOwner = room.owner.objectId === ctx.user?.objectId;
    room.reservations = [];

    if (hasUser) {
        const result = await reservationService.getByRoomId(id);
        room.reservations = result.results;
    }

    ctx.render(detailsTemplate(ctx.data, hasUser, onDelete, submitHandler(book)));

    async function onDelete() {
        const choice = confirm('Are you sure you want to take down this offer?');

        if (choice) {
            await roomService.deleteById(id);
            ctx.page.redirect('/rooms');
        }
    }

    async function book({ startDate, endDate }) {
        startDate = new Date(startDate);
        endDate = new Date(endDate);

        if (Number.isNaN(startDate.getDate())) {
            return alert('Invalid starting date!');
        }
        if (Number.isNaN(endDate.getDate())) {
            return alert('Invalid ending date!');
        }
        if (endDate <= startDate) {
            return alert('Ending state must be after starting date!');
        }

        const reservationData = {
            startDate,
            endDate,
            room: id,
            host: ctx.data.owner.objectId
        };

        const result = await reservationService.create(reservationData, ctx.user.objectId);
        ctx.page.redirect('/rooms/' + id);
    }
}