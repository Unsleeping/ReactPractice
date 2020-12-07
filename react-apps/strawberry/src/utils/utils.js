export const saveTokenToLocalStorage = (token) => {
  localStorage.token = token;
};

export const getTokenFromLocalStorage = () => {
  window.token = localStorage.token;
};
