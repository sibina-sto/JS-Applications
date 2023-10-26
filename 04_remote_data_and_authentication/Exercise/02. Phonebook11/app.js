function attachEvents() {
    document.getElementById("btnLoad").addEventListener("click", onLoadAllRecords);
    
}

function renderRecord(data) {
    const ul = document.getElementById("phonebook");
    Object.values(data).forEach(rec => {
        const li = document.createElement("li");
        li.textContent = `${rec.person}: ${rec.phone}`
        li.setAttribute("data-id", rec._id);
        
        const bnt = document.createElement("button");
        bnt.textContent = "Delete"
        li.appendChild(bnt);
        ul.appendChild(li);
    })
    
}

async function onLoadAllRecords() {
  const url = "http://localhost:3030/jsonstore/phonebook";
  const response = await fetch(url);
  const data = await response.json();

  return renderRecord(data);
}

async function onCreateRecords(person, phone) {
  const url = "http://localhost:3030/jsonstore/phonebook";
  const body = {
    person,
    phone,
  };
  
  const headers = getHeader("POST", body);
  const response = await fetch(url, headers);

  const data = await response.json();
  return data;
}

async function onDeleteRecords(id) {
    const url = `http://localhost:3030/jsonstore/phonebook/${id}`;
    
    const header = getHeader("DELETE", null);
    const response = await fetch(url, header);
    const data = await response.json();
    return data;
}

function getHeader(method, body) {
    return {
      method: `${method}`,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    };
}

attachEvents();
