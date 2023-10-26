let userData = null;

window.addEventListener('DOMContentLoaded', async () => {
    userData = JSON.parse(sessionStorage.getItem('userdata'));
    const catches = document.getElementById('catches');
    catches.innerHTML = '';
    if (userData !== null) {
        document.getElementById('catches').innerHTML = '';
        loadData();
        document.getElementById('guest').style.display = 'none';
        document.getElementById('greeting').innerText = userData.email;
        document.querySelector('.add').disabled = false;
    } else {
        document.getElementById('user').style.display = 'none';
    }
    document.querySelector('.load').addEventListener('click', loadData);
    document.getElementById('logout').addEventListener('click', onLogout);
    document.getElementById('addForm').addEventListener('submit', onCreate);
    catches.addEventListener('click', eventHandler);
});

// TODO need to fix the the so called "before loading"
async function loadData() {
    const res = await fetch('http://localhost:3030/data/catches');
    const data = await res.json();
    console.log(data);
    document
        .getElementById('catches')
        .replaceChildren(...data.map(createCatch));
}

function createCatch(data) {
    const isOwner = userData && data._ownerId === userData.id;

    const div = document.createElement('div');
    div.classList.add('catch');
    div.dataset.id = data._id;

    const html = `
	<label>Angler</label>
	<input type="text" class="angler" value="${data.angler}" ${
        !isOwner ? 'disabled' : ''
    }>
	<label>Weight</label>
	<input type="text" class="weight" value="${data.weight}" ${
        !isOwner ? 'disabled' : ''
    }>
	<label>Species</label>
	<input type="text" class="species" value="${data.species}" ${
        !isOwner ? 'disabled' : ''
    }>
	<label>Location</label>
	<input type="text" class="location" value="${data.location}" ${
        !isOwner ? 'disabled' : ''
    }>
	<label>Bait</label>
	<input type="text" class="bait" value="${data.bait}" ${
        !isOwner ? 'disabled' : ''
    }>
	<label>Capture Time</label>
	<input type="number" class="captureTime" value="${data.captureTime}" ${
        !isOwner ? 'disabled' : ''
    }>
	<button class="update" data-id="${data._ownerId}" ${!isOwner ? 'disabled' : ''}>
		Update
	</button>
	<button class="delete" data-id="${data._ownerId}" ${!isOwner ? 'disabled' : ''}>
		Delete
	</button>
`;
    div.innerHTML = html;
    return div;
}

async function onLogout() {
    const res = await fetch('http://localhost:3030/users/logout', {
        method: 'get',
        headers: {
            'X-authorization': userData.accessToken,
        },
    });
    sessionStorage.clear();
    window.location = './index.html';
}

async function onCreate(ev) {
    ev.preventDefault();
    const formData = new FormData(ev.target);
    if (Array.from(formData.values()).some(val => val == '')) {
        alert('Fill all the fields');
    }
    try {
        const res = await fetch('http://localhost:3030/data/catches ', {
            method: 'post',
            headers: {
                'content-type': 'application/json',
                'X-authorization': userData.accessToken,
            },
            body: JSON.stringify(Object.fromEntries(formData)),
        });
        const newCatch = await res.json();
        document.getElementById('catches').appendChild(createCatch(newCatch));
        Object.values(ev.target)
            .filter(el => el.nodeName == 'INPUT')
            .forEach(el => (el.value = ''));
    } catch (error) {
        alert(error.message);
    }
}

async function onDelete(ev) {
    const catchId = ev.target.parentNode.dataset.id;
    ev.target.parentNode.remove();

    await fetch(`http://localhost:3030/data/catches/${catchId}`, {
        method: 'delete',
        headers: {
            'X-authorization': userData.accessToken,
            'content-type': 'application/json',
        },
    });
}

async function onUpdate(ev) {
    const catchId = ev.target.parentNode.dataset.id;

    const data = Object.fromEntries(
        Array.from(ev.target.parentNode.children)
            .filter(el => el.nodeName == 'INPUT')
            .map(el => [el.className, el.value])
    );

    const res = await fetch(`http://localhost:3030/data/catches/${catchId}`, {
        method: 'put',
        headers: {
            'X-authorization': userData.accessToken,
            'content-type': 'application/json',
        },
        body: JSON.stringify(data),
    });
}

function eventHandler(ev) {
    if (ev.target.nodeName !== 'BUTTON') {
        return;
    }
    ev.target.className == 'update' ? onUpdate(ev) : onDelete(ev);
}
