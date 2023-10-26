import { html } from '../../node_modules/lit-html/lit-html.js';

const userTemplate = user => html`
  <!--Only users-->
  <li><a href="/profile">Profile</a></li>
  <li><a href="/create">Create Event</a></li>
  <li><a href="/logout">Logout</a></li>
`;

const guestTemplate = () => html`
  <!--Only guest-->
  <li><a href="/login">Login</a></li>
  <li><a href="/register">Register</a></li>
`;

export const navigationTemplate = user => html`
  <nav>
    <a href="/">Theater</a>
    <ul>
      ${user ? userTemplate() : guestTemplate()}
    </ul>
  </nav>
`;
