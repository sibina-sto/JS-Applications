import {html} from '../lib.js'
import {getAlbumByName} from "../api/data.js";
import {getUserData} from "../util.js";

const searchTemplate = (onSearch) => html`
    <section id="searchPage">
        <h1>Search by Name</h1>

        <div class="search">
            <input id="search-input" type="text" name="search" placeholder="Enter desired albums's name">
            <button @click=${onSearch} class="button-list">Search</button>
        </div>

        <h2>Results:</h2>

        <!--Show after click Search button-->
        <div style=display:hidden class="search-result">


        </div>
    </section>`;

const albumCard = (user, album) => `
    <div class="card-box">
        <img src="${album.imgUrl}">
        <div>
            <div class="text-center">
                <p class="name">Name: ${album.name}</p>
                <p class="artist">Artist: ${album.artist}</p>
                <p class="genre">Genre: ${album.genre}</p>
                <p class="price">Price: ${album.price}</p>
                <p class="date">Release Date: ${album.releaseDate}</p>
            </div>
            ${user != null ?
                        `
                        <div class="btn-group">
                            <a href="/details/${album._id}" id="details">Details</a>
                        </div>` : ''}

        </div>
    </div>`

export async function searchPage(ctx) {
    const userData = getUserData();



    ctx.render(searchTemplate(onSearch));

    async function onSearch(event) {
        event.preventDefault();
        const div = document.querySelector(".search-result")
        const userInput = document.getElementById('search-input')

        if (userInput.value == "") {
            alert("The field is required!")
            return
        }

        const albums = await getAlbumByName(userInput.value);
        div.style.display = "inline"

        if (albums.length == 0) {
            div.innerHTML = `<p class="no-result">No result.</p>`
        } else {
            div.innerHTML = ''
            const data = albums.map(x => albumCard(userData, x))
            for (let obj of data) {
                div.innerHTML += obj
            }
        }

    }

}
