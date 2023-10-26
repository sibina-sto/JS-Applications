import { html } from "../../node_modules/lit-html/lit-html.js";
import {
  deleteProductById,
  getProductById,
  getTotalBuys,
  didUserBought,
  buy,
} from "../api/data.js";

const detailsTamplate = (
  product,
  isOwner,
  onDelete,
  isLoggedIn,
  totalBuysCount,
  onClickBuy,
  didUserBuy
) => html`
<section id="details">
          <div id="details-wrapper">
            <img id="details-img" src="${product.imageUrl}" alt="example1" />
            <p id="details-title">${product.name}</p>
            <p id="details-category">
              Category: <span id="categories">${product.category}</span>
            </p>
            <p id="details-price">
              Price: <span id="price-number">${product.price}</span>$</p>
            <div id="info-wrapper">
              <div id="details-description">
                <h4>Bought:<span id="buys">${totalBuysCount}</span> times.</h4>
                <span>${product.description}</span>
              </div>
              <div id="action-buttons">
      ${isOwner
        ? html`<a href="/edit/${product._id}" id="edit-btn">Edit</a>
            <a href="javascript:void(0)" id="delete-btn" @click=${onDelete}
              >Delete</a
            >`
        : ""}
      ${(() => {
        if (didUserBuy == 0) {
          if (isLoggedIn && !isOwner) {
            return html`<a
              href="javascript:void(0)"
              @click=${onClickBuy}
              id="buy-btn"
              >Buy</a
            >`;
          }
        }
      })()}
    </div>
            </div>
`;

export async function detailsPage(ctx) {
  const productId = ctx.params.id;
  const product = await getProductById(productId);
  const user = ctx.user;

  let userId;
  let totalBuysCount;
  let didUserBuy;

  if (user != null) {
    userId = user._id;
    didUserBuy = await didUserBought(productId, userId);
  }

  const isOwner = user && product._ownerId == user._id;
  const isLoggedIn = user !== undefined;

  totalBuysCount = await getTotalBuys(productId);
  ctx.render(
    detailsTamplate(
      product,
      isOwner,
      onDelete,
      isLoggedIn,
      totalBuysCount,
      onClickBuy,
      didUserBuy
    )
  );

  async function onClickBuy() {
    const donation = {
      productId,
    };
    await buy(donation);

    totalBuysCount = await getTotalBuys(productId);
    didUserBuy = await didUserBought(productId, userId);
    ctx.render(
      detailsTamplate(
        product,
        isOwner,
        onDelete,
        isLoggedIn,
        totalBuysCount,
        onClickBuy,
        didUserBought
      )
    );
  }

  async function onDelete() {
    const confirmed = confirm("Are you sure?");
    if (confirmed) {
      await deleteProductById(productId);
      ctx.page.redirect("/");
    }
  }
}
