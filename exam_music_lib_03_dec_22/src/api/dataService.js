import * as api from './api.js';

const endpoints = {
  register: '/users/register',
  login: '/users/login',
  logout: '/users/logout',
  catalog: '/data/albums?sortBy=_createdOn%20desc',
  create: '/data/albums',
  likes: '/data/likes',
  details: (id) => `/data/albums/${id}`,
  delete: (id) => `/data/albums/${id}`,
  total: (albumId) =>
    `/data/likes?where=albumId%3D%22${albumId}%22&distinct=_ownerId&count`,
  own: (albumId, userId) =>
    `/data/likes?where=albumId%3D%22${albumId}%22%20and%20_ownerId%3D%22${userId}%22&count`,
};

export const getAlbums = async () => {
  return api.get(endpoints.catalog)
}

export const createAlbum = async (data) => {
  return api.post(endpoints.create, data)
}

export const getDetails = async (id) => {
  return api.get(endpoints.details(id))
}

export const deleteAlbum = async (id) => {
  return await api.del(endpoints.delete(id))
}

export const getLikes = async (albumId) => {
  return await api.get(endpoints.total(albumId))
}

export const giveLike = async (albumId) => {
  return await api.post(endpoints.likes, {albumId})
}

export const getOwnLikes = async (id, userId) => {
  return api.get(endpoints.own(id, userId))
}

export const updateAlbum = async (id, data) => {
  return await api.put(endpoints.details(id), data)
}