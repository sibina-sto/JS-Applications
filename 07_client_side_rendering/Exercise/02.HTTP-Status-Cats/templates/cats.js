import { html } from '/lib.js';

const catTemplate = cat => html`
    <li>
        <img src="./images/${cat.imageLocation}.jpg" width="250" height="250" alt="Card image cap" />
        <div class="info">
            <button class="showBtn" @click=${onClick}>Show status code</button>
            <div class="status" style="display: none" id=${cat.id}>
                <h4>Status Code: ${cat.statusCode}</h4>
                <p>${cat.statusMessage}</p>
            </div>
        </div>
    </li>
`;

function onClick(ev) {
    const div = ev.target.parentElement.lastElementChild;
    div.style.display = div.style.display == 'none' ? 'block' : 'none';
    ev.target.textContent = ev.target.textContent == 'Show status code' ? 'Hide status code' : 'Show status code';
}

export default catTemplate;
