import { showDetails } from "./details.js";
import { ensureNotEmpty, get, post } from "./utils.js";
import { generateTopic } from "./templates.js";

const container = document.querySelector(".container");
const content = document.querySelector("main");
const commentsContainer = content.querySelector("div.topic-container");
const form = content.querySelector("form");
content.remove();

form.addEventListener("submit", onSubmit);

export async function showHome() {
  container.replaceChildren(content);
  await loadData();
}

function getTopic(data) {
  const topic = generateTopic(data);
  topic.addEventListener("click", onDetails);
  return topic;
}

async function loadData() {
  try {
    const data = await get(
      "http://localhost:3030/jsonstore/collections/myboard/posts"
    );
    commentsContainer.replaceChildren(...Object.values(data).map(getTopic));
  } catch (err) {
    alert(err.message);
    commentsContainer.replaceChildren("");
  }
}

function onDetails(ev) {
  let target = ev.target;
  if (target.tagName === "H2") {
    target = target.parentElement;
  }
  if (target.tagName === "A") {
    showDetails(target.dataset.id);
  }
}

async function onSubmit(ev) {
  ev.preventDefault();

  if (ev.submitter.className === "cancel") {
    form.reset();
    return;
  }

  const formData = new FormData(form);
  const { topicName, username, postText } = Object.fromEntries(formData);
  try {
    ensureNotEmpty(topicName, "Topic required!");
    ensureNotEmpty(username, "Username required!");
    ensureNotEmpty(postText, "Post required!");

    let record = {
      title: topicName,
      username: username,
      content: postText,
      postTime: new Date(),
    };

    const data = await post(
      "http://localhost:3030/jsonstore/collections/myboard/posts",
      record
    );
    commentsContainer.appendChild(getTopic(data));
    form.reset();
  } catch (err) {
    alert(err.message);
  }
}
