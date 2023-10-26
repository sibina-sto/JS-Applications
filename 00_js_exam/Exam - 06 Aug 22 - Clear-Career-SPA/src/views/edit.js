import { get, put } from "../api.js";
import { html } from "../lib.js";

let url = '/data/offers/'; // +id


const editTemplate = (offer, onSubmit) => html`<section id="edit">
    <div class="form" @submit=${onSubmit}>
        <h2>Edit Offer</h2>
        <form class="edit-form">
            <input type="text" name="title" id="job-title" placeholder="Title" .value=${offer.title}/>
            <input type="text" name="imageUrl" id="job-logo" placeholder="Company logo url" .value=${offer.imageUrl}/>
            <input type="text" name="category" id="job-category" placeholder="Category" .value=${offer.category} />
            <textarea id="job-description" name="description" placeholder="Description" rows="4" cols="50" .value=${offer.description}></textarea>
            <textarea id="job-requirements" name="requirements" placeholder="Requirements" rows="4" cols="50" .value=${offer.requirements}></textarea>
            <input type="text" name="salary" id="job-salary" placeholder="Salary" .value=${offer.salary} />

            <button type="submit">post</button>
        </form>
    </div>
</section>`

export async function editView(ctx) {
    let offer = await get(url + ctx.params.offerId);
    ctx.render(editTemplate(offer, onSubmit));

    console.log(offer);

    async function onSubmit(ev) {
        ev.preventDefault();


        let formData = new FormData(ev.target);

        let title = formData.get('title');
        let imageUrl = formData.get('imageUrl');
        let category = formData.get('category');
        let description = formData.get('description');
        let requirements = formData.get('requirements');
        let salary = formData.get('salary');


        if(title == '' ||
        imageUrl == '' ||
        category == '' ||
        description == '' ||
        requirements == '' ||
        salary == '') {
            return alert('All fields are required!');
        }


        let offer = {
            title,
            imageUrl,
            category,
            description,
            requirements,
            salary
        };

        await put(url + ctx.params.offerId, offer);
        ctx.page.redirect('/details/' + ctx.params.offerId);
    }

}