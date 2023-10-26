import { addOwner, createPointer, encodeObject, filterRelation } from '../util.js';
import { get, post, put, del } from './api.js';


const endpoints = {
    'rooms': `/classes/Room?where=${encodeObject({ openForBooking: true })}&include=owner`,
    'roomsWithUser': (userId) => `/classes/Room?where=${encodeObject({ $or: [{ openForBooking: true }, filterRelation('owner', '_User', userId)] })}&include=owner`,
    'roomById': '/classes/Room/',
};

export async function getAll(userId) {
    if (userId) {
        return get(endpoints.roomsWithUser(userId));
    } else {
        return get(endpoints.rooms);
    }
}

export async function getById(id) {
    return get(endpoints.roomById + id);
}

export async function create(roomData, userId) {
    return post(endpoints.rooms, addOwner(roomData, userId));
}

export async function update(id, roomData, userId) {
    return put(endpoints.roomById + id, addOwner(roomData, userId));
}

export async function deleteById(id) {
    return del(endpoints.roomById + id);
}