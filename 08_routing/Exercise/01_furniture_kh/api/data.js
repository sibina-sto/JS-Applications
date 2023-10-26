import { post, get, put, del } from './api.js';

const BASE_URL = '/data/catalog';

const endpoints = {
    catalog: id => BASE_URL + '/' + id,
    myFurniture: userId => BASE_URL + '/' + `?where=_ownerId%3D%22${userId}%22`,
};

async function createFurniture(data) {
    return await post(BASE_URL, data);
}

async function getAllFurniture() {
    return await get(BASE_URL);
}

async function getFurnitureDetails(id) {
    return await get(endpoints.catalog(id));
}

async function updateFurniture(id, data) {
    return await put(endpoints.catalog(id), data);
}

async function deleteFurniture(id) {
    return await del(endpoints.catalog(id));
}

async function myFurniture(id) {
    return await get(endpoints.myFurniture(id));
}

export { createFurniture, getAllFurniture, getFurnitureDetails, updateFurniture, myFurniture, deleteFurniture };
