import { html } from '../lib/lit-html.js';


const homeTemplate = () => html`
<h1>Welcome to Softuni SleepOver!</h1>
<p>Find accomodation in many locations across the country. <a href="/rooms">Browse catalog</a></p>
<p>Have a room to offer? <a href="/host">Place an ad right now!</a></p>`;


export function homeView(ctx) {
    ctx.render(homeTemplate());
}