export function setUserData(data) {
    sessionStorage.setItem('userData', JSON.stringify(data));
}

export function getUserData() {
    return JSON.parse(sessionStorage.getItem('userData'));
}

export function clearUserData() {
    return sessionStorage.removeItem('userData');
}
