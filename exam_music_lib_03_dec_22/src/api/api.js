import * as authService from './authService.js';
const HOST = 'http://localhost:3030';

const request = async (method, url, data) => {
  const options = {
    method,
    headers: {},
  };
  if (data) {
    options.headers['Content-Type'] = 'application/json';
    options.body = JSON.stringify(data);
  }
  const user = authService.getUser();
  if (user) {
    options.headers['X-Authorization'] = user.accessToken;
  }
  try {
    const res = await fetch(HOST + url, options);
    if (res.status == 204) {
      return;
    }
    const data = await res.json();
    if (!res.ok) {
      if (res.status == 403) {
        sessionStorage.removeItem('userdata');
      }
      throw new Error(data.message);
    }
    return data;
  } catch (error) {
    throw new Error(error);
  }
};

const get = request.bind(null, 'get');
const post = request.bind(null, 'post');
const put = request.bind(null, 'put');
const del = request.bind(null, 'delete');
const patch = request.bind(null, 'patch');

export { get, post, put, del, patch };
