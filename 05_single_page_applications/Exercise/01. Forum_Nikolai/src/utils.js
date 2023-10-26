export function ensureNotEmpty(field, message = "Required!") {
  if (!field) {
    throw new Error(message);
  }
}

export function ce(type, attributes, ...content) {
  const result = document.createElement(type);

  Object.entries(attributes || {}).forEach(([attribute, value]) => {
    if (isEventListener(attribute)) {
      result.addEventListener(
        attribute.substring(2).toLocaleLowerCase(),
        value
      );
    } else {
      result[attribute] = value;
    }
  });

  content = content.reduce((a, c) => a.concat(Array.isArray(c) ? c : [c]), []);

  content.forEach((e) => {
    if (isElement(e)) {
      result.appendChild(e);
    } else {
      const node = document.createTextNode(e);
      result.appendChild(node);
    }
  });

  return result;

  function isEventListener(attr) {
    return attr.substring(0, 2).localeCompare("on") === 0;
  }

  function isElement(element) {
    return typeof element != "string" && typeof element != "number";
  }
}

export async function get(url) {
  let response = await fetch(url);

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message);
  }

  return data;
}

export async function post(url, payload) {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message);
  }

  return data;
}
