import { html } from '../../node_modules/lit-html/lit-html.js';
import { profileEvents } from '../api/dataService.js';
import { myComponent } from '../component/component.js';

const profileTemplate = (events, user) => html`
  <!--Profile Page-->
  <section id="profilePage">
    <div class="userInfo">
      <div class="avatar">
        <img src="./images/profilePic.png" />
      </div>
      <h2>${user.email}</h2>
    </div>
    <div class="board">
      <!--If there are event-->
      ${!events.length
        ? html` <div class="no-events">
            <p>This user has no events yet!</p>
          </div>`
        : events.map(myComponent)}
    </div>
  </section>
`;

export const profileView = async ctx => {
  const events = await profileEvents(ctx.user._id);
  ctx.renderContent(profileTemplate(events, ctx.user));
};
