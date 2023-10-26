const host = 'http://localhost:3030';

async function request(url, method, data) {
    const options = {
        method: null,
        headers: {},
        body: null,
    };

    const user = JSON.parse(sessionStorage.getItem('userdata'));

    if (method !== undefined) {
        options.method = method;
        if (user) {
            options.headers['X-Authorization'] = user.token;
        }
    }

    if (data !== undefined) {
        options.headers['Content-Type'] = 'application/json';
        options.body = JSON.stringify(data);
    }

    try {
        const res = await fetch(host + url, options);
        if (res.status == 204) {
            return;
        }
        if (res.ok == false) {
            if (res.status == 403) {
                sessionStorage.clear();
            }
            const data = await res.json();
            throw new Error(data.message);
        }
        return await res.json();
    } catch (error) {
        alert(error.message);
        throw new Error(error.message);
    }
}

async function get(url) {
    return await request(url, 'get');
}

async function post(url, data) {
    return await request(url, 'post', data);
}

async function put(url, data) {
    return await request(url, 'put', data);
}

async function del(url) {
    return await request(url, 'delete');
}

export { get, post, put, del };