export const saveTokenToLocalStorage = (token) => {
  localStorage.token = token;
};

export const getTokenFromLocalStorage = () => {
  window.token = localStorage.token;
};

export const checkUserEmail = (email) => {
  if (
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      email
    )
  )
    return true;
  return false;
};

export const checkUserPassword = (password) => {
  if (/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm.test(password))
    return true;
  return false;
};

export const emptyChecker = (value) => !!value;
