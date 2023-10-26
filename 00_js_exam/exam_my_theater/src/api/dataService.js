import * as api from './api.js';

//  ************ Implement the data service **************
// Endpoints go here
const endpoints = {
  register: '/users/register',
  login: '/users/login',
  logout: '/users/logout',
  catalog: '/data/theaters?sortBy=_createdOn%20desc&distinct=title',
  create: '/data/theaters',
  like: '/data/likes',
  details: id => `/data/theaters/${id}`,
  delete: id => `/data/theaters/${id}`,
  profile: id => `/data/theaters?where=_ownerId%3D%22${id}%22&sortBy=_createdOn%20desc`,
  total: theaterId => `/data/likes?where=theaterId%3D%22${theaterId}%22&distinct=_ownerId&count`,
  own: (theaterId, userId) =>
    `/data/likes?where=theaterId%3D%22${theaterId}%22%20and%20_ownerId%3D%22${userId}%22&count`,
};
// export data functions go here

export const getAll = async () => {
  return await api.get(endpoints.catalog);
};

export const createEvent = async data => {
  return await api.post(endpoints.create, data);
};

export const profileEvents = async id => {
  return await api.get(endpoints.profile(id));
};

export const getDetails = async id => {
  return await api.get(endpoints.details(id));
};

export const deleteEvent = async id => {
  return await api.del(endpoints.delete(id));
};

export const getLikes = async id => {
  return await api.get(endpoints.total(id));
};

export const getOwn = async (eventId, userId) => {
  return await api.get(endpoints.own(eventId, userId));
};

export const editEvent = async (id, data) => {
  return await api.put(endpoints.details(id), data);
};

export const like = async theaterId => {
  return await api.post(endpoints.like, { theaterId });
};
