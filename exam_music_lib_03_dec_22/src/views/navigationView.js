import { html } from '../../node_modules/lit-html/lit-html.js';

const userTemplate = user => html`
  <div class="user">
    <a href="/create">Add Album</a>
    <a href="/logout">Logout</a>
  </div>
`;

const guestTemplate = () => html`
  <div class="guest">
    <a href="/login">Login</a>
    <a href="/register">Register</a>
  </div>
`;

export const navigationTemplate = user => html`
  <!-- Navigation -->
  <a id="logo" href="/"><img id="logo-img" src="./images/logo.png" alt="" /></a>

  <nav>
    <div>
      <a href="/catalog">Dashboard</a>
    </div>
    ${user ? userTemplate() : guestTemplate()}
  </nav>
`;
