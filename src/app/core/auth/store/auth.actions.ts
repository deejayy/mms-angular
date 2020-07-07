import { Action } from '@ngrx/store';

export enum AuthActionTypes {
  AUTHENTICATE = '[AUTH] Authenticate',
  TOKEN_RECEIVE = '[AUTH] Token receive',
  DEAUTHENTICATE = '[AUTH] Deauthenticate',
}

export class AuthAuthenticate implements Action {
  public readonly type = AuthActionTypes.AUTHENTICATE;
  constructor(public payload: { data: object }) {}
}

export class AuthTokenReceive implements Action {
  public readonly type = AuthActionTypes.TOKEN_RECEIVE;
  constructor(public payload: { accessToken: string }) {}
}

export class AuthDeauthenticate implements Action {
  public readonly type = AuthActionTypes.DEAUTHENTICATE;
  constructor(public payload: string) {}
}

export type AuthActions = AuthAuthenticate | AuthTokenReceive | AuthDeauthenticate;
