import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AuthFacade } from '../store/auth.facade';

@Injectable()
export class AuthService {
  public accessToken$: Observable<string> = of('token');

  public constructor(private authFacade: AuthFacade) {
    this.accessToken$ = this.authFacade.accessToken$;
  }

  public authenticate(accessToken: string): void {
    this.authFacade.authenticate({ accessToken });
  }

  public deauthenticate(): void {
    this.authFacade.deauthenticate();
  }

  public static checkTokenValidity(accessToken: string, tokenData: { exp: number }): boolean {
    return accessToken && tokenData.exp * 1000 > new Date().getTime();
  }
}
