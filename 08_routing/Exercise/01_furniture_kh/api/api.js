const host = 'http://localhost:3030';

async function req(method, url, data) {
  const options = {
    method,
    headers: {},
  };

  if (data) {
    options.headers['Content-Type'] = 'application/json';
    options.body = JSON.stringify(data);
  }

  const user = JSON.parse(sessionStorage.getItem('userdata'));

  if (user) {
    options.headers['X-Authorization'] = user.token;
  }

  try {
    const res = await fetch(host + url, options);

    if (!res.ok) {
      if (res.status === 403) {
        sessionStorage.clear();
      }
      const data = await res.json();
      throw new Error(data.message);
    }

    if (res.status == 204) {
      return res;
    } else {
      return await res.json();
    }
  } catch (error) {
    alert(error.message);
    throw new Error(error);
  }
}

const get = req.bind(null, 'get');
const post = req.bind(null, 'post');
const put = req.bind(null, 'put');
const del = req.bind(null, 'delete');

export { get, post, put, del };
