import { ce } from "./utils.js";

export function generateTopic(data) {
  const div = document.createElement("div");
  div.className = "topic-name-wrapper";
  div.innerHTML = `<div class="topic-name">
            <a href="#" class="normal" data-id="${data._id}">
                <h2>${data.title}</h2>
            </a>
            <div class="columns">
                <div>
                    <p>Date:
                        <time>${data.postTime}</time>
                    </p>
                    <div class="nick-name">
                        <p>Username: <span>${data.username}</span></p>
                    </div>
                </div>
            </div>
        </div>`;
  return div;
}

export function createComment(comment) {
  const div = document.createElement("div");
  div.className = "topic-name-wrapper";
  div.innerHTML = `<div class="topic-name">
            <p><strong>${comment.username}</strong> commented on
                <time>${new Date(comment.postTime).toLocaleString(
                  "en-US"
                )}</time>
            </p>
            <div class="post-content">
                <p>${comment.text}</p>
            </div>
        </div>`;

  return div;
}

export function createThemeTitle(data) {
  const div = ce("div", { className: "theme-name-wrapper" });
  div.innerHTML = `<div class="theme-name-wrapper">
            <div class="theme-name">
                <h2>${data.title}</h2>
            </div>
        </div>`;
  return div;
}

export function createCommentHeader(data) {
  const div = ce("div", { className: "header" });
  div.innerHTML = `
    <div class="header">
        <img src="./static/profile.png" alt="avatar">
           <p><span>${data.username}</span> posted on
                    <time>${new Date(data.postTime).toLocaleString("sv")}</time>
                </p>
                <p class="post-content">${data.content}</p>
    </div>`;
  return div;
}
