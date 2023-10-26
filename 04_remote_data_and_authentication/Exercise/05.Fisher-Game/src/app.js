let logoutBtn = document.getElementById("logout");
let loginBtn = document.getElementById("login");
let registerBtn = document.getElementById("register");
let pWelcome = document.querySelector("span");
let catchesDiv = document.getElementById("catches");
catchesDiv.innerHTML = "";
let loadCatchesBtn = document.querySelector("aside button");
let addForm = document.querySelector("form");
let addCatchBtn = addForm.querySelector("button");

if (sessionStorage.accessToken === undefined) {
  logoutBtn.style.display = "none";
  loginBtn.style.display = "inline-block";
  registerBtn.style.display = "inline-block";
  pWelcome.textContent = "guest";
  addCatchBtn.disabled = true;
} else {
  loginBtn.style.display = "none";
  logoutBtn.style.display = "inline-block";
  registerBtn.style.display = "none";
  pWelcome.textContent = sessionStorage.email;
  addCatchBtn.disabled = false;
}

logoutBtn.addEventListener("click", async () => {
  let url = "http://localhost:3030/users/logout";

  let response = await fetch(url, {
    method: "get",
    headers: { "X-Authorization": sessionStorage.accessToken },
  });

  if (response.status === 204) {
    sessionStorage.clear();
    location.assign("./index.html");
  }
});

loadCatchesBtn.addEventListener("click", async () => {
  catchesDiv.innerHTML = "";
  let url = "http://localhost:3030/data/catches";

  let response = await fetch(url);

  let catchesData = await response.json();

  catchesData.forEach((currCatch) => {
    let newCatch = makeCatchHtml(currCatch);
    let updateBtn = newCatch.querySelectorAll("button")[0];
    updateBtn.addEventListener("click", updateCatch);
    let deleteBtn = newCatch.querySelectorAll("button")[1];
    deleteBtn.addEventListener("click", deleteCatch);

    catchesDiv.appendChild(newCatch);
  });
});

function makeCatchHtml(catchData) {
  let htmlString = `
        <div class="catch" id="${catchData._id}">
            <label>Angler</label>
            <input type="text" class="angler" value="${catchData.angler}" disabled>
            <label>Weight</label>
            <input type="text" class="weight" value="${catchData.weight}" disabled>
            <label>Species</label>
            <input type="text" class="species" value="${catchData.species}" disabled>
            <label>Location</label>
            <input type="text" class="location" value="${catchData.location}" disabled>
            <label>Bait</label>
            <input type="text" class="bait" value="${catchData.bait}" disabled>
            <label>Capture Time</label>
            <input type="number" class="captureTime" value="${catchData.captureTime}" disabled>
            <button class="update" data-id="${catchData._ownerId}" disabled>Update</button>
            <button class="delete" data-id="${catchData._ownerId}" disabled>Delete</button>
        </div>
        `;

  if (catchData._ownerId === sessionStorage.id) {
    htmlString = `
        <div class="catch" id="${catchData._id}">
            <label>Angler</label>
            <input type="text" class="angler" value="${catchData.angler}">
            <label>Weight</label>
            <input type="text" class="weight" value="${catchData.weight}">
            <label>Species</label>
            <input type="text" class="species" value="${catchData.species}">
            <label>Location</label>
            <input type="text" class="location" value="${catchData.location}">
            <label>Bait</label>
            <input type="text" class="bait" value="${catchData.bait}">
            <label>Capture Time</label>
            <input type="number" class="captureTime" value="${catchData.captureTime}">
            <button class="update" data-id="${catchData._ownerId}">Update</button>
            <button class="delete" data-id="${catchData._ownerId}">Delete</button>
        </div>
        `;
  }

  let element = document.createElement("template");
  element.innerHTML = htmlString.trim();
  return element.content.firstElementChild;
}

async function updateCatch(e) {
  let currCatch = e.target.parentElement;
  let url = `http://localhost:3030/data/catches/${currCatch.id}`;
  let inputFields = currCatch.querySelectorAll("input");
  let data = {
    angler: inputFields[0].value,
    weight: inputFields[1].value,
    species: inputFields[2].value,
    location: inputFields[3].value,
    bait: inputFields[4].value,
    captureTime: inputFields[5].value,
  };

  if (!validator(data)) {
    alert("Try again!");
  } else {
    await fetch(url, {
      method: "put",
      headers: {
        "content-type": "application/json",
        "X-Authorization": sessionStorage.accessToken,
      },
      body: JSON.stringify(data),
    });
  }
}

async function deleteCatch(e) {
  let currCatch = e.target.parentElement;
  let url = `http://localhost:3030/data/catches/${currCatch.id}`;

  let response = await fetch(url, {
    method: "delete",
    headers: { "X-Authorization": sessionStorage.accessToken },
  });

  if (response.status === 200) {
    loadCatchesBtn.click();
  }
}

addForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  let formData = new FormData(e.currentTarget);
  let url = "http://localhost:3030/data/catches";
  let data = {
    angler: formData.get("angler"),
    weight: formData.get("weight"),
    species: formData.get("species"),
    location: formData.get("location"),
    bait: formData.get("bait"),
    captureTime: formData.get("captureTime"),
  };

  if (!validator(data)) {
    alert("Try again!");
  } else {
    let response = await fetch(url, {
      method: "post",
      headers: {
        "content-type": "application/json",
        "X-Authorization": sessionStorage.accessToken,
      },
      body: JSON.stringify(data),
    });

    if (response.status === 200) {
      loadCatchesBtn.click();
    }
  }
});

function validator(data) {
  if (
    data.angler.length == 0 ||
    data.weight.length == 0 ||
    data.species.length == 0 ||
    data.location.length == 0 ||
    data.bait.length == 0 ||
    data.captureTime.length == 0
  ) {
    return false;
  }

  return true;
}
