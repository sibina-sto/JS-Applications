export async function request(type, url, content, token) {
  let res;
  const headers = {
    'content-type': 'application/json',
  };

  if (token) {
    headers['X-Authorization'] = token;
  }
  if (type !== 'GET') {
    res = await fetch(url, {
      method: type,
      headers,
      body: JSON.stringify(content),
    });
  } else {
    if (token) {
      delete headers['content-type'];
      res = await fetch(url, {
        method: 'GET',
        headers,
      });
    } else {
      res = await fetch(url);
    }
  }

  return res;
}
