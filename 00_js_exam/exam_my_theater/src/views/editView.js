import { html, nothing } from '../../node_modules/lit-html/lit-html.js';
import { editEvent } from '../api/dataService.js';
import { handleData, submitHandler } from '../utils/utils.js';

const editTemplate = (event, submitHandler) => html`
  <!--Edit Page-->
  <section id="editPage">
    <form class="theater-form" @submit=${submitHandler}>
      <h1>Edit Theater</h1>
      <div>
        <label for="title">Title:</label>
        <input id="title" name="title" type="text" placeholder="Theater name" value=${event.title} />
      </div>
      <div>
        <label for="date">Date:</label>
        <input id="date" name="date" type="text" placeholder="Month Day, Year" value=${event.date} />
      </div>
      <div>
        <label for="author">Author:</label>
        <input id="author" name="author" type="text" placeholder="Author" value=${event.author} />
      </div>
      <div>
        <label for="description">Theater Description:</label>
        <textarea id="description" name="description" placeholder="Description">${event.description}</textarea>
      </div>
      <div>
        <label for="imageUrl">Image url:</label>
        <input id="imageUrl" name="imageUrl" type="text" placeholder="Image Url" value=${event.imageUrl} />
      </div>
      <button class="btn" type="submit">Submit</button>
    </form>
  </section>
`;

export const editView = ctx => {
  const id = ctx.params.id;
  const onSubmit = async (data, form) => {
    handleData(data, editEvent, id);
    ctx.page.redirect(`/details/${id}`);
    form.reset();
  };
  ctx.renderContent(editTemplate(ctx.data, submitHandler(onSubmit)));
};
