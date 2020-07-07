import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Actions, Effect, ofType } from '@ngrx/effects';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';

import { sessionKeys } from '../model/storage-keys';

import { AuthActionTypes, AuthAuthenticate, AuthDeauthenticate, AuthTokenReceive, AuthActions } from './auth.actions';
import { AuthService } from '../service/auth.service';

@Injectable()
export class AuthEffects {
  @Effect()
  public tokenReceive$: Observable<AuthAuthenticate | AuthDeauthenticate> = this.actions$.pipe(
    ofType(AuthActionTypes.TOKEN_RECEIVE),
    tap((action: AuthTokenReceive) => window.localStorage.setItem(sessionKeys.tokenIdentifier, action.payload.accessToken)),
    map((action: AuthTokenReceive) => {
      const jwt = new JwtHelperService();
      try {
        const tokenData = jwt.decodeToken(action.payload.accessToken) || [];
        if (AuthService.checkTokenValidity(action.payload.accessToken, tokenData)) {
          return new AuthAuthenticate(tokenData);
        } else {
          console.error('[APP] Token validation error');
          return new AuthDeauthenticate('Token validation error');
        }
      } catch (error) {
        console.error('[APP] Invalid token passed to authentication, ', error);
      }
    }),
  );

  @Effect({ dispatch: false })
  public deauthenticate$: Observable<AuthDeauthenticate> = this.actions$.pipe(
    ofType(AuthActionTypes.DEAUTHENTICATE),
    tap(() => {
      window.localStorage.removeItem(sessionKeys.tokenIdentifier);
      this.router.navigate(['/']);
    }),
  );

  constructor(private router: Router, private actions$: Actions) {}
}
