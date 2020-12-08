import { API_URL } from '../constants/constants';

export const signin = async (body) => {
  // http://127.0.0.1:8000/api-registration/
  try {
    const rawResponse = await fetch(`${API_URL}/api-registration/`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    const data = await rawResponse.json();
    return data;
  } catch {
    return false;
  }
};

export const login = async (body) => {
  // http://127.0.0.1:8000/api-login/
  try {
    const rawResponse = await fetch(`${API_URL}/api-login/`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    const data = await rawResponse.json();
    return data;
  } catch {
    return false;
  }
};
