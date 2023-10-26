import * as api from './api.js';

export const login = api.login;
export const register = api.register;
export const logout = api.logout;

export async function getAllEvents() {
    return api.get('/data/theaters?sortBy=_createdOn%20desc&distinct=title');
}

export async function getEventById(id) {
    return api.get('/data/theaters/' + id);
}

export async function getEventsByUser(userId) {
    return api.get(`/data/theaters?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`);
}

export async function createEvent(event) {
    return api.post('/data/theaters', event)
}

export async function editEventById(id, event) {
    return api.put('/data/theaters/' + id, event)
}

export async function deleteEventById(id) {
    return api.del('/data/theaters/' + id);
}

export async function userHasLikedEvent(eventId, userId) {
    return api.get(`/data/likes?where=theaterId%3D%22${eventId}%22%20and%20_ownerId%3D%22${userId}%22&count`)
}

export async function getTotalLikes(eventId) {
    return api.get(`/data/likes?where=theaterId%3D%22${eventId}%22&distinct=_ownerId&count`);
}

export async function giveLike(eventId) {
    return api.post('/data/likes', { theaterId: eventId })
}