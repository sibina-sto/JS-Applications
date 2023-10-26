import { html } from "../../node_modules/lit-html/lit-html.js";
import { editProductById, getProductById } from "../api/data.js";

const editTamplate = (product, onSubmit) => html`
<section id="edit">
          <div class="form">
            <h2>Edit Product</h2>
            <form class="edit-form" @submit=${onSubmit}>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Product Name"
                value="${product.name}"
              />
              <input
                type="text"
                name="imageUrl"
                id="product-image"
                placeholder="Product Image URL"
                value="${product.imageUrl}"
              />
              <input
                type="text"
                name="category"
                id="product-category"
                placeholder="Category"
                value="${product.category}"
              />
              <textarea
                id="product-description"
                name="description"
                rows="5"
                cols="50"
               
              >${product.description}</textarea>
              
              <input
                type="text"
                name="price"
                id="product-price"
                placeholder="Price"
                value="${product.price}"
              />
              <button type="submit">post</button>
            </form>
          </div>
        </section>
`;

export async function editPage(ctx) {
  const productId = ctx.params.id;

  const product = await getProductById(productId);
  ctx.render(editTamplate(product, onSubmit));

  async function onSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);

    const editProduct = {
      name: formData.get("name").trim(),
      imageUrl: formData.get("imageUrl").trim(),
      category: formData.get("category").trim(),
      description: formData.get("description").trim(),
      price: formData.get("price").trim(),
    };

    if (Object.values(editProduct).some((x) => !x)) {
      return alert("All fields are required!");
    }

    await editProductById(productId, editProduct);
    event.target.reset();
    ctx.page.redirect(`/details/${productId}`);
  }
}
