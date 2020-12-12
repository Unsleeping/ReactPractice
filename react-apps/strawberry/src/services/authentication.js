import { API_URL } from '../constants/constants';

export const signin = async (body) => {
  try {
    const rawResponse = await fetch(`${API_URL}/api/signin`, {
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

export const signup = async (body) => {
  try {
    const rawResponse = await fetch(`${API_URL}/api/signup`, {
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
