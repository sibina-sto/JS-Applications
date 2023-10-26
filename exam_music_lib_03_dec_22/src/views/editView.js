import { html } from "../../node_modules/lit-html/lit-html.js";
import { updateAlbum } from "../api/dataService.js";
import { handleData, submitHandler } from "../utils.js";

const editTemplate = (item, submitHandler) => html`
  <section id="edit">
    <div class="form">
      <h2>Edit Album</h2>
      <form class="edit-form" @submit=${submitHandler}>
        <input
          type="text"
          name="singer"
          id="album-singer"
          placeholder="Singer/Band"
          .value=${item.singer}
        />
        <input
          type="text"
          name="album"
          id="album-album"
          placeholder="Album"
          .value=${item.album}
        />
        <input
          type="text"
          name="imageUrl"
          id="album-img"
          placeholder="Image url"
          .value=${item.imageUrl}
        />
        <input
          type="text"
          name="release"
          id="album-release"
          placeholder="Release date"
          .value=${item.release}
        />
        <input
          type="text"
          name="label"
          id="album-label"
          placeholder="Label"
          .value=${item.label}
        />
        <input
          type="text"
          name="sales"
          id="album-sales"
          placeholder="Sales"
          .value=${item.sales}
        />

        <button type="submit">post</button>
      </form>
    </div>
  </section>
`;

export const editView = (ctx) => {
  const id = ctx.params.id;
  const onSubmit = async (data, form) => {
    handleData(data, updateAlbum, id);
    ctx.page.redirect(`/details/${id}`);
    form.reset();
  };
  ctx.renderContent(editTemplate(ctx.data, submitHandler(onSubmit)));
};
