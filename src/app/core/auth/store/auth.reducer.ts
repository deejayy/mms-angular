import { AuthState } from './auth.state';
import { AuthActions, AuthActionTypes } from './auth.actions';
import { produce } from 'immer';

const initialState: AuthState = {
  data: null,
  authenticated: false,
  authMessage: null,
};

export function authReducer(state: AuthState = initialState, action: AuthActions) {
  return produce(state, (draft: AuthState) => {
    switch (action.type) {
      case AuthActionTypes.TOKEN_RECEIVE:
        draft.data = { token: action.payload.accessToken };
        draft.authMessage = null;
        break;

      case AuthActionTypes.AUTHENTICATE:
        draft.authenticated = true;
        draft.data = { ...draft.data, ...action.payload };
        draft.authMessage = null;
        break;

      case AuthActionTypes.DEAUTHENTICATE:
        draft.authenticated = false;
        draft.data = {};
        draft.authMessage = action.payload;
        break;

      default:
        return state;
    }
  });
}
