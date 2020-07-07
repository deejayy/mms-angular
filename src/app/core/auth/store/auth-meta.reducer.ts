import { ActionReducer } from '@ngrx/store';
import { JwtHelperService } from '@auth0/angular-jwt';

import { sessionKeys } from '../model/storage-keys';
import { AuthState } from './auth.state';
import { AuthService } from '../service/auth.service';

export function initStateFromLocalStorage(reducer: ActionReducer<{ auth: AuthState }>): ActionReducer<{ auth: AuthState }> {
  return (state, action) => {
    const newState = { ...reducer(state, action) };

    if (action.type === '@ngrx/effects/init') {
      const jwt = new JwtHelperService();
      const accessToken = window.localStorage.getItem(sessionKeys.tokenIdentifier);
      try {
        const tokenData = jwt.decodeToken(accessToken);
        if (AuthService.checkTokenValidity(accessToken, tokenData)) {
          newState.auth = { ...newState.auth, data: { ...tokenData, token: accessToken }, authenticated: true };
        }
      } catch (error) {
        console.error('[APP] Invalid token in localStorage, ', error);
      }
    }

    return newState;
  };
}
