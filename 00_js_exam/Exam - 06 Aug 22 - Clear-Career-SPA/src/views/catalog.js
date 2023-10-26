import { get } from "../api.js";
import { html } from "../lib.js";



let url = '/data/offers?sortBy=_createdOn%20desc';

const catalogTemplate = (offers) => html`<section id="dashboard">

<h2>Job Offers</h2>

 ${offers.map(o => singleOffer(o))}

</section>`


const emptyCatalog = () => html`<section id="dashboard">
<h2>Job Offers</h2>
<h2>No offers yet.</h2>
</section>
`

let singleOffer = (offer) => html`
<div class="offer">
            <img src=${offer.imageUrl} alt=".${offer.imageUrl}" />
            <p>
              <strong>Title: </strong
              ><span class="title">${offer.title}</span>
            </p>
            <p><strong>Salary:</strong><span class="salary">${offer.salary}</span></p>
            <a class="details-btn" href="/details/${offer._id}">Details</a>
          </div>`


export async function catalogView(ctx) {

    let offers = await get(url);

    if(offers.length > 0) {
    ctx.render(catalogTemplate(offers));
    } else {
        ctx.render(emptyCatalog());
    }
}