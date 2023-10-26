import * as api from "./api.js";

const host = "http://localhost:3030";
api.settings.host = host;

export const login = api.login;
export const register = api.register;
export const logout = api.logout;

// Application-specific request
// get all listings
export async function getAllProducts() {
  return await api.get(host + "/data/products?sortBy=_createdOn%20desc");
}

// get listing by id
export async function getProductById(id) {
  return await api.get(host + `/data/products/${id}`);
}

// create listing
export async function addProduct(product) {
  return await api.post(host + "/data/products", product);
}

// edit listing by id
export async function editProductById(id, product) {
  return await api.put(host + `/data/products/${id}`, product);
}

// delete listing by id
export async function deleteProductById(id) {
  return await api.del(host + `/data/products/${id}`);
}

export async function buy(productId) {
  return await api.post(host + `/data/bought`, productId);
}

export async function getTotalBuys(productId) {
  return await api.get(
    host +
      `/data/bought?where=productId%3D%22${productId}%22&distinct=_ownerId&count`
  );
}

export async function didUserBought(productId, userId) {
  return await api.get(
    host +
      `/data/bought?where=productId%3D%22${productId}%22%20and%20_ownerId%3D%22${userId}%22&count`
  );
}
