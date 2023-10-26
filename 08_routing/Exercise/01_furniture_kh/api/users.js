import { post, get } from './api.js';
import { setUserData } from '../util.js';

const endpoints = {
    login: '/users/login',
    register: '/users/register',
    logout: '/users/logout',
};

export async function login(email, password) {
    const res = await post(endpoints.login, { email, password });
    setUserData({ email: res.email, id: res._id, token: res.accessToken });
}

export async function register(email, password) {
    const res = await post(endpoints.register, { email, password });
    setUserData({ email: res.email, id: res._id, token: res.accessToken });
}

export async function logout() {
    await get(endpoints.logout);
    sessionStorage.clear();
}
