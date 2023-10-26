import { del, get, post, put } from "./api.js";

export async function getAll() {
    return get('/data/movies');
};

export async function createMovie(movieData) {
    return post(`/data/movies/`, movieData)
};

export async function editMovie(movieData, id) {
    return put(`/data/movies/`+ id, movieData)
}

export async function getMovieById(id) {
    return get('/data/movies/' + id);
};

export async function getLikes(movieId) {
    return get(`/data/likes?where=movieId%3D%22${movieId}%22&distinct=_ownerId&count`);
};

export async function deleteById(id) {
    return del('/data/movies/' + id);
};

