const STORE_KEY = "userData";
const getUserData = () => JSON.parse(sessionStorage.getItem(STORE_KEY));
const setUserData = (userData) =>
  sessionStorage.setItem(STORE_KEY, JSON.stringify(userData));
const clearUserData = () => sessionStorage.removeItem(STORE_KEY);
const isAuthenticated = () => getUserData() !== null;

export { clearUserData, getUserData, setUserData, isAuthenticated };
