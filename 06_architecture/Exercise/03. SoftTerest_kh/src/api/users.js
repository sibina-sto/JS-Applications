import { post, get } from './api.js';

const endpoints = {
    login: '/users/login',
    register: '/users/register',
    logout: '/users/logout',
};

export async function login(data) {
    const res = await post(endpoints.login, data);
    sessionStorage.setItem('userdata', JSON.stringify({ email: res.email, token: res.accessToken, id: res._id }));
}

export async function register(data) {
    const res = await post(endpoints.register, data);
    sessionStorage.setItem('userdata', JSON.stringify({ email: res.email, token: res.accessToken, id: res._id }));
}

export async function logout() {
    await get(endpoints.logout);
    sessionStorage.clear();
}