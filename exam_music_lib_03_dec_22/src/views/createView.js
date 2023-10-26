import { html } from "../../node_modules/lit-html/lit-html.js";
import { createAlbum } from "../api/dataService.js";
import { handleData, submitHandler } from "../utils.js";

const createTemplate = (submitHandler) => html`
  <section id="create">
    <div class="form">
      <h2>Add Album</h2>
      <form class="create-form" @submit=${submitHandler}>
        <input
          type="text"
          name="singer"
          id="album-singer"
          placeholder="Singer/Band"
        />
        <input type="text" name="album" id="album-album" placeholder="Album" />
        <input
          type="text"
          name="imageUrl"
          id="album-img"
          placeholder="Image url"
        />
        <input
          type="text"
          name="release"
          id="album-release"
          placeholder="Release date"
        />
        <input type="text" name="label" id="album-label" placeholder="Label" />
        <input type="text" name="sales" id="album-sales" placeholder="Sales" />

        <button type="submit">post</button>
      </form>
    </div>
  </section>
`;

export const createView = (ctx) => {
  const onSubmit = async (data, form) => {
    handleData(data, createAlbum);
    ctx.page.redirect("/catalog");
    form.reset();
  };
  ctx.renderContent(createTemplate(submitHandler(onSubmit)));
};
