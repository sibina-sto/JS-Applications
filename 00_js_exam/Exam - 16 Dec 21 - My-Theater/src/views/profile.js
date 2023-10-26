import { getEventsByUser } from '../api/data.js';
import { html } from '../lib.js';
import { getUserData } from '../util.js';

const profileTemplate = (user, events) => html`
<section id="profilePage">
    <div class="userInfo">
        <div class="avatar">
            <img src="./images/profilePic.png">
        </div>
        <h2>${user.email}</h2>
    </div>
    <div class="board">
        ${events.length == 0 
        ? html`
        <div class="no-events">
            <p>This user has no events yet!</p>
        </div>`
        : html`${events.map(eventCard)}`}
    </div>
</section>`;

const eventCard = (event) => html`
<div class="eventBoard">
    <div class="event-info">
        <img src=${event.imageUrl}>
        <h2>${event.title}</h2>
        <h6>${event.date}</h6>
        <a href="/details/${event._id}" class="details-button">Details</a>
    </div>
</div>`;

export async function profilePage(ctx) {
    const userData = getUserData();
    const events = await getEventsByUser(userData.id);
    ctx.render(profileTemplate(userData, events));
}