import {
  createComment,
  createCommentHeader,
  createThemeTitle,
} from "./templates.js";
import { ensureNotEmpty, get, post } from "./utils.js";

const container = document.querySelector(".container");
const section = document.querySelector(".theme-content");
const form = section.querySelector("form");
const themeTitle = section.querySelector(".theme-title");
const themeComments = section.querySelector(".comment");
const commentsElement = section.querySelector("div#user-comment");
section.remove();
form.addEventListener("submit", onSubmit);

export async function showDetails(postId) {
  loadTheme(postId);
  loadComments(postId);

  form.dataset.id = postId;
  container.replaceChildren(section);
}

async function loadTheme(postId) {
  try {
    const data = await get(
      `http://localhost:3030/jsonstore/collections/myboard/posts/${postId}`
    );
    themeTitle.replaceChildren(createThemeTitle(data));
    themeComments.replaceChildren(createCommentHeader(data));
  } catch (err) {
    alert(err.message);
  }
}

async function loadComments(postId) {
  try {
    const data = await get(
      `http://localhost:3030/jsonstore/collections/myboard/comments`
    );

    const comments = Object.values(data).filter((c) => c.postId === postId);
    commentsElement.replaceChildren(...comments.map(createComment));
    themeComments.appendChild(commentsElement);
  } catch (err) {
    alert(err.message);
  }
}

async function onSubmit(ev) {
  ev.preventDefault();
  const formData = new FormData(form);
  const { username, postText } = Object.fromEntries(formData);
  try {
    ensureNotEmpty(postText, "Comment required!");
    ensureNotEmpty(username, "Username required!");

    let sentData = {
      postId: form.dataset.id,
      username: username,
      text: postText,
      postTime: new Date(),
    };

    const data = await post(
      "http://localhost:3030/jsonstore/collections/myboard/comments",
      sentData
    );

    themeComments.appendChild(createComment(data));
    form.reset();
  } catch (err) {
    alert(err.message);
  }
}
