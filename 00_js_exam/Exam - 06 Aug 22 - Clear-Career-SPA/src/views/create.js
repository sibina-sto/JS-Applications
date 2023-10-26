
import { post } from "../api.js";
import { html } from "../lib.js";

let url = '/data/offers';

const createTemplate = (onSubmit) => html`<section id="create">
    <div class="form">
        <h2>Create Offer</h2>
        <form class="create-form" @submit=${onSubmit}>
            <input type="text" name="title" id="job-title" placeholder="Title" />
            <input type="text" name="imageUrl" id="job-logo" placeholder="Company logo url" />
            <input type="text" name="category" id="job-category" placeholder="Category" />
            <textarea id="job-description" name="description" placeholder="Description" rows="4" cols="50"></textarea>
            <textarea id="job-requirements" name="requirements" placeholder="Requirements" rows="4"
                cols="50"></textarea>
            <input type="text" name="salary" id="job-salary" placeholder="Salary" />

            <button type="submit">post</button>
        </form>
    </div>
</section>`

export function createView(ctx) {
    ctx.render(createTemplate(onSubmit));


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

        await post(url, offer);
        ctx.page.redirect('/catalog');
    }

}