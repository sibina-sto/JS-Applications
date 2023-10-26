import { html } from '../../node_modules/lit-html/lit-html.js';

import { getBookById, deleteBook, getLikesForABook, getLikesOfAUser, likeBook } from '../api/data.js';

const detailsTemplate = (book, isOwner, onDelete, onLike, likes, hasLike) => html `
        <section id="details-page" class="details">
            <div class="book-information">
                <h3>${book.title}</h3>
                <p class="type">Type: ${book.type}</p>
                <p class="img"><img src=${book.imageUrl}></p>
                <div class="actions">
                    <!-- Edit/Delete buttons ( Only for creator of this book )  -->
                    ${sessionStorage.getItem('userId') ? html `
                    ${isOwner ? html`
                    <a class="button" href="/edit/${book._id}">Edit</a>
                    <a class="button" @click=${onDelete} href="javascript:void(0)">Delete</a>`
                    : html ` ${hasLike ? '' : html `<a class="button" @click=${onLike} href="javascript:void(0)">Like</a>`}`}
                    ` : ''}
                    <!-- ( for Guests and Users )  -->
                    <div class="likes">
                        <img class="hearts" src="/images/heart.png">
                        <span id="total-likes">Likes: ${likes}</span>
                    </div>
                    <!-- Bonus -->
                </div>
            </div>
            <div class="book-description">
                <h3>Description:</h3>
                <p>${book.description}</p>
            </div>
        </section>`;

export async function detailsPage(ctx) {
    const userId = sessionStorage.getItem('userId');
    const bookId = ctx.params.id;
    const book = await getBookById(bookId);

    const likes = await getLikesForABook(bookId);

    const hasLike = userId ? await getLikesOfAUser(bookId, userId) : 0;

    const isOwner = userId == book._ownerId;
    ctx.render(detailsTemplate(book, isOwner, onDelete, onLike, likes, hasLike));

    async function onDelete() {
        const confirmed = confirm('Are you sure?');
        if(confirmed) {
            await deleteBook(bookId);
            ctx.page.redirect('/');
        }
    }

    async function onLike() {
        await likeBook(bookId);
        ctx.page.redirect(`/details/${bookId}`);
    }
}