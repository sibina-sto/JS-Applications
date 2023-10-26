import { get, post } from './api.js';

const endpoints = {
    allIdeas: '/data/ideas?select=_id%2Ctitle%2Cimg&sortBy=_createdOn%20desc',
    singleIdea: id => `/data/ideas/${id}`,
    create: '/data/ideas',
};

export async function getAllIdeas() {
    return await get(endpoints.allIdeas);
}

export async function createIdea(data) {
    return await post(endpoints.create, data);
}

export async function getSingleIdea(id) {
    return await get(endpoints.singleIdea(id));
}