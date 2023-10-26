export function setUserData(data) {
  sessionStorage.setItem('userdata', JSON.stringify(data));
}

export function getUserData() {
  return JSON.parse(sessionStorage.getItem('userdata'));
}

