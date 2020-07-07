import { Injectable } from '@angular/core';

import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { getAuthenticated, getAccessToken, getAuthMessage } from './auth.selectors';
import { AuthState } from './auth.state';
import { AuthDeauthenticate, AuthTokenReceive } from './auth.actions';

@Injectable({
  providedIn: 'root',
})
export class AuthFacade {
  public authenticated$: Observable<boolean> = this.store.pipe(select(getAuthenticated));
  public accessToken$: Observable<string> = this.store.pipe(select(getAccessToken));
  public authMessage$: Observable<string> = this.store.pipe(select(getAuthMessage));

  public authenticate = (data: { accessToken: string }): void => this.store.dispatch(new AuthTokenReceive(data));

  public deauthenticate(reason?: string): void {
    this.store.dispatch(new AuthDeauthenticate(reason));
  }

  constructor(private store: Store<AuthState>) {}
}
