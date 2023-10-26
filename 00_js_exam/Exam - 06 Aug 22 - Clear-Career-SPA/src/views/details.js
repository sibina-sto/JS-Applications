import { get, post } from "../api.js";
import { html } from "../lib.js";
import { getUserData } from "../utility.js";

let url = '/data/offers/'; // + id


const detailsTemplate = (offer, showEdit, showApply, applyForJob, applications) => html`<section id="details">
   <section id="details">
          <div id="details-wrapper">
            <img id="details-img" src=${offer.imageUrl} alt="example1" />
            <p id="details-title">${offer.title}</p>
            <p id="details-category">
              Category: <span id="categories">${offer.category}</span>
            </p>
            <p id="details-salary">
              Salary: <span id="salary-number">${offer.salary}</span>
            </p>
            <div id="info-wrapper">
              <div id="details-description">
                <h4>Description</h4>
                <span
                  >${offer.description}</span
                >
              </div>
              <div id="details-requirements">
                <h4>Requirements</h4>
                <span
                  >${offer.requirements}</span
                >
              </div>
            </div>
            <p>Applications: <strong id="applications">${applications}</strong></p>

            <!--Edit and Delete are only for creator-->
            <div id="action-buttons">
              <a href="/catalog/edit/${offer._id}" id="edit-btn" style="display:${showEdit}">Edit</a>
              <a href="/catalog/delete/${offer._id}" id="delete-btn" style="display:${showEdit}">Delete</a>

              <!--Bonus - Only for logged-in users ( not authors )-->
              <a href="" id="apply-btn" style="display:${showApply}" @click=${applyForJob}>Apply</a>
            </div>
          </div>
        </section>`


        //<p>Applications: <strong id="applications">${applications}</strong></p>

export async function detailsView(ctx) {
    let userData = getUserData();
    let offerId = ctx.params.offerId;
    let offer = await get(url + offerId);

    let applications = await get(`/data/applications?where=offerId%3D%22${ctx.params.offerId}%22&distinct=_ownerId&count`);
    let userAplications = await get(`/data/applications?where=offerId%3D%22${offerId}%22%20and%20_ownerId%3D%22${userData.userId}%22&count`);

    let showEdit = 'none';
    let showApply = 'none';

    if (userData) {
        showApply = 'inline';
        if (offer._ownerId == userData.userId) {
            showEdit = 'inline';
            showApply = 'none';
        }
    }

    if(userAplications == 1) {
      showApply = 'none';
    }
    

    ctx.render(detailsTemplate(offer, showEdit, showApply, applyForJob, applications));

    async function applyForJob(ev) {
        await post('/data/applications', {offerId});
        let updatedAppl = await get(`/data/applications?where=offerId%3D%22${ctx.params.offerId}%22&distinct=_ownerId&count`);
        showApply = 'none';
        ctx.render(detailsTemplate(offer, showEdit, showApply, applyForJob, updatedAppl));
    }
}