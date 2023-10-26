import { get, post } from "./api.js";
import { clearUserData, setUserData } from "./users_store.js";

const endPoints = {
  login: "/users/login",
  register: "/users/register",
  logout: "/users/logout",
};

async function register(email, password) {
  const user = await post(endPoints.register, { email, password });
  setUserData(user);
}

async function login(email, password) {
  const user = await post(endPoints.login, { email, password });
  setUserData(user);
}

function logout() {
  get(endPoints.logout);
  clearUserData();
}

export { login, register, logout };
