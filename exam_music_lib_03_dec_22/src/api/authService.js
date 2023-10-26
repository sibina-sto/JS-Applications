export const getUser = () => {
  return JSON.parse(sessionStorage.getItem('userdata'));
};

export const setUser = data => {
  sessionStorage.setItem('userdata', JSON.stringify(data));
};
