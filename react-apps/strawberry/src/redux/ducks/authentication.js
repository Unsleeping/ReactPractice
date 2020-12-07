import { signin } from '../../services/authentication';
import {
  saveTokenToLocalStorage,
  getTokenFromLocalStorage,
} from '../../utils/utils';

const SET_AUTHENTICATION = 'authentication/SET_AUTHENTICATION';
const SET_SIGNIN_STATE = 'authentication/SET_SIGNIN_STATE';

const initialState = {
  isAuthenticated: false,
  userData: {},
  inputFieldsState: {
    userName: null,
    password: null,
  },
};

export const setAuthenticationState = (value) => ({
  type: SET_AUTHENTICATION,
  isAuthenticated: value,
});

export const setInputFieldsState = (state) => ({
  type: SET_SIGNIN_STATE,
  inputFieldsState: state,
});

export const toSignin = (body) => async (dispatch) => {
  const response = await signin(body);
  if (response) {
    if (response.token) {
      saveTokenToLocalStorage(response.token);
      getTokenFromLocalStorage();
      dispatch(setAuthenticationState(true));
    }
  }
};

export const authenticationReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SIGNIN_STATE:
      return {
        ...state,
        inputFieldsState: action.inputFieldsState,
      };
    case SET_AUTHENTICATION:
      return {
        ...state,
        isAuthenticated: action.isAuthenticated,
      };
    default:
      return state;
  }
};
