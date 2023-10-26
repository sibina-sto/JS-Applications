import { clearUserData, getUserData } from "./users_store.js";

const host = "http://localhost:3030";

async function request(method, url, data) {
  const userData = getUserData();
  const options = {
    method: method,
    headers: {},
  };

  if (data !== undefined) {
    options.headers = { "Content-Type": "application/json" };
    options.body = JSON.stringify(data);
  }

  if (userData) {
    options.headers["X-Authorization"] = userData.accessToken;
  }

  try {
    const response = await fetch(host + url, options);

    if (response.status === 204) {
      return response;
    }

    if (response.status === 403) {
      clearUserData();
    }

    const responseData = await response.json();
    if (!response.ok) {
      throw new Error(responseData.message);
    }

    return responseData;
  } catch (err) {
    alert(err.message);
    throw err;
  }
}

const get = request.bind(null, "get");
const post = request.bind(null, "POST");
const put = request.bind(null, "PUT");
const del = request.bind(null, "DELETE");

export { get, post, put, del };
