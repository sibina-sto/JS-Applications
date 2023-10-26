import { html } from '../../node_modules/lit-html/lit-html.js';

// *** create the componen here and late use it to create the templates ***

export const eventComponent = event => html`
  <div class="eventsInfo">
    <div class="home-image">
      <img src=${event.imageUrl} />
    </div>
    <div class="info">
      <h4 class="title">${event.title}</h4>
      <h6 class="date">${event.date}</h6>
      <h6 class="author">${event.author}</h6>
      <div class="info-buttons">
        <a class="btn-details" href="/details/${event._id}">Details</a>
      </div>
    </div>
  </div>
`;

export const myComponent = event => html`
  <div class="eventBoard">
    <div class="event-info">
      <img src=${event.imageUrl} />
      <h2>${event.title}</h2>
      <h6>${event.date}</h6>
      <a href="/details/${event._id}" class="details-button">Details</a>
    </div>
  </div>
`;
