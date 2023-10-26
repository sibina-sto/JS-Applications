import { getUserData, removeUserData } from "./utility.js";

const host = 'http://localhost:3030';

async function request(method, url, data) {
    let options = {
        method,
        headers: {}
    };

    if(data != undefined) {
        options.headers['Content-Type'] = 'application/json';
        options.body = JSON.stringify(data);
    }

    let userData = getUserData();
    if(userData) {
        options.headers['X-Authorization'] = userData.accessToken;
    }

    try {
        let response = await fetch(host + url, options);

        if(!response.ok) {

            if(response.status == 403) {
                removeUserData();
            }
            let error = await response.json();
            throw Error(error.message);
        }

        if(response.status == 204) {
            return response;
        } else {
            return await response.json();
        }

    } catch (err) {
        alert(err.message);
        return err;
    }
}

export async function get(url) {
    return request('GET', url);
}

export async function post(url, data) {
    return request('POST', url, data);
}

export async function put(url, data) {
    return request('PUT', url, data);
}

export async function remove(url) {
    return request('DELETE', url);
}