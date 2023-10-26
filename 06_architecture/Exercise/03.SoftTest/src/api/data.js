import * as api from './api.js';

const endpoints = {
    "getAllIdea": "data/ideas?select=_id%2Ctitle%2Cimg&sortBy=_createdOn%20desc",
    "createIdea": "data/ideas",
    "ideaById": "data/ideas/"
}

export async function getAllIdea(){
    return api.get(endpoints.getAllIdea)
}

export async function createIdea(data){
    return api.post(endpoints.createIdea, data)
}
// new
export async function getIdeaById(id){
    return api.get(endpoints.ideaById + id);
}

export async function deleteById(id) {
    return api.delete(endpoints.ideaById + id)
}