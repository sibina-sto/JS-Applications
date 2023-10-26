// let pattern = /%%(.+?)%%/g;

// const templates = {};

// export async function render(templateName, context) {
//   let html = await loadTemplate(templateName);

//   const template = html.replace(pattern, replacer);

//   function replacer(match, name) {
//     const value = context[name];
//     if (value !== undefined) {
//       return escapeHtml(value);
//     }
//     return match;
//   }

//   let result = html.replace("%%username%%", context["username"]);
//   result = result.replace(
//     "%%items%%",
//     context["items"].map((i) => `<li>${i}</li>`).join("\n")
//   );
//   document.querySelector("main").innerHTML = result;
// //   debugger;
// }

// async function loadTemplate(name) {
//   if (templates[name] === undefined) {
//     const response = await fetch(`/views/${name}.html`);
//     templates[name] = await response.text();
//   }
//   return templates[name];
// }

// function escapeHtml(html) {
//   return html
//     .toString()
//     .replaceAll("<", "&lt;")
//     .replaceAll(">", "&gt;")
//     .replaceAll("&", "&amp;");
// }


const placeholderPattern = /%%(.+?)%%/g;

const templates = {}

export async function render(templateName, ctx) {
  const html = await loadTemplate(templateName);
  const result = html.replace(placeholderPattern, replacer);
  
   return result;

  function replacer(match, name) {
    const value = ctx[name];
    if (value !== undefined) {
        return escapeHtml(value);
    } else {
        return match;
    }
  }
}

async function loadTemplate(name) {
  if (templates[name] === undefined) {
    const response = await fetch(`/views/${name}.html`);
    templates[name] = await response.text();
  }
  return templates[name];
}

function escapeHtml(html) {
  return html
  .toString()
  .replaceAll('&', '&amp;')
  .replaceAll("<", "&lt;")
  .replaceAll(">", "&gt;")
}