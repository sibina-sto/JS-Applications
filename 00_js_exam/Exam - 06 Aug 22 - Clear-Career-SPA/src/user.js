import { get, post } from "./api.js";
import { removeUserData, setUserData } from "./utility.js";


export async function login(email, password) {
    let loginUrl = '/users/login';
    let userCredentials = { email, password };
    let result = await post(loginUrl, userCredentials);

    let userData = {
        userId: result._id,
        email: result.email,
        accessToken: result.accessToken
    };


    setUserData(userData);
    return result;
}

export async function register(email, password) {
    let registerUrl = '/users/register';
    let userCredentials = { email, password };
    let result = await post(registerUrl, userCredentials);

    let userData = {
        userId: result._id,
        email: result.email,
        accessToken: result.accessToken
    };
    console.log(userData);

    setUserData(userData);
    return result;
}

export function logout() {
    let logoutUrl = '/users/logout';
    get(logoutUrl);
    removeUserData();
}
